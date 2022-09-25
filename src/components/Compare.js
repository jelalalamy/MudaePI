import React from 'react'
import Header from './Header'
import {getDocs, collection, orderBy, query} from 'firebase/firestore'
import { firestore } from '../config.js';
import { useState } from 'react'

const Compare = () => {
    const [firstDateString, setFirstDateString] = useState('');
    const [secondDateString, setSecondDateString] = useState('');
    const [largestGain, setLargestGain] = useState({val: 0, name:''});
    const [largestLoss, setLargestLoss] = useState({val: 0, name:''});
    const [results, setResults] = useState([]);
    const [displayMsg, setDisplayMsg] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    const compareDates = async () => {
        setLargestGain({val: 0, name:''});
        setLargestLoss({val: 0, name:''});
        let firstDate = new Date(firstDateString.split('-')[0], firstDateString.split('-')[1]-1, firstDateString.split('-')[2]);
        let secondDate = new Date(secondDateString.split('-')[0], secondDateString.split('-')[1]-1, secondDateString.split('-')[2]);
        if (firstDate < secondDate) [firstDate, secondDate] = [secondDate, firstDate];
        console.log(`Comparing dates ${firstDate.toISOString().substring(0,10)} and ${secondDate.toISOString().substring(0,10)}`);

        let arr1 = new Map();
        let arr2 = new Map();

        const read = async () => {
            const querySnapshot1 = await getDocs(query(collection(firestore, firstDate.toISOString().substring(0,10)), orderBy("rank")));
            querySnapshot1.forEach((doc) => {
                arr1.set(doc.data().name, doc.data());
            });
            const querySnapshot2 = await getDocs(query(collection(firestore, secondDate.toISOString().substring(0,10)), orderBy("rank")));
            querySnapshot2.forEach((doc) => {
                arr2.set(doc.data().name, doc.data());
            });
            const tempGain = {val: 0, name:''};
            const tempLoss = {val: 0, name:''};
            let tempResults = [];
            arr1.forEach((char, key) => {
                console.log(`${key} => ${char.rank} to ${arr2.get(key).rank}`);
                tempResults.push(`${key} => ${char.rank} to ${arr2.get(key).rank}`);
                let change = char.rank - arr2.get(key).rank;
                if (change > tempGain.val){
                    tempGain.val = change;
                    tempGain.name = key;
                } else if (change < tempLoss.val){
                    tempLoss.val = change;
                    tempLoss.name = key;
                }
            });
            setLargestGain(tempGain);
            setLargestLoss(tempLoss);
            setResults(tempResults);
        };
        read();
        console.log(`Largest gain: ${largestGain.name}, ${largestGain.val}\n`+
                        `Largest loss: ${largestLoss.name}, ${largestLoss.val}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setDisplayMsg(`Comparing ${firstDateString} and ${secondDateString}`);
        compareDates();
        setShowDetails(false);
    }

    return (
        <div>
            <Header/>
            <div className='compareWrapper'>
                <h1>Compare</h1>
                <div className='compareFormWrapper'>
                    <form className='compareForm' onSubmit={onSubmit}>
                        <div className='formControl'>
                            <label>First Date</label>
                            <input type='text' placeholder='YYYY-MM-DD' value={firstDateString} onChange={(e) => setFirstDateString(e.target.value)}/>
                        </div>
                        <div className='formControl'>
                            <label>Second Date</label>
                            <input type='text' placeholder='YYYY-MM-DD' value={secondDateString} onChange={(e) => setSecondDateString(e.target.value)}/>
                        </div>
                        <input type='submit' value='Compare'/>
                    </form>
                </div>
                {displayMsg.length > 0 && (<p>{displayMsg}</p>)}
                {largestGain.name.length > 0 ? (<p>{`largest gain: ${largestGain.name}, ${largestGain.val}`}</p>) : (<p>largest gain:</p>)}
                {largestLoss.name.length > 0 ? (<p>{`largest loss: ${largestLoss.name}, ${largestLoss.val}`}</p>) : (<p>largest loss:</p>)}
                <button onClick={() => setShowDetails(!showDetails)}>Show Details</button>
                {(results.length > 0 && showDetails) && (results.map((char) => (
                    <p>{char}</p>
                )))}
            </div>
        </div>
    )
}

export default Compare