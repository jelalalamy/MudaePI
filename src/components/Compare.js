import React from 'react'
import Header from './Header'
import CompareDetails from './CompareDetails';
import {getDocs, collection, orderBy, query} from 'firebase/firestore'
import { firestore } from '../config.js';
import { useState } from 'react'

const Compare = () => {
    const [firstDate, setFirstDate] = useState('');
    const [secondDate, setSecondDate] = useState('');
    const [largestGain, setLargestGain] = useState({val: 0, name:''});
    const [largestLoss, setLargestLoss] = useState({val: 0, name:''});
    const [results, setResults] = useState([]);
    const [displayMsg, setDisplayMsg] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    const compareDates = async () => {
        // Reset gain and loss values
        setLargestGain({val: 0, name:''});
        setLargestLoss({val: 0, name:''});

        let arr1 = new Map();
        let arr2 = new Map();

        const read = async () => {
            // Retrieving snapshots for both dates
            const querySnapshot1 = await getDocs(query(collection(firestore, firstDate), orderBy("rank")));
            querySnapshot1.forEach((doc) => {
                arr1.set(doc.data().name, doc.data());
            });
            const querySnapshot2 = await getDocs(query(collection(firestore, secondDate), orderBy("rank")));
            querySnapshot2.forEach((doc) => {
                arr2.set(doc.data().name, doc.data());
            });
            // Temporary variables to store results
            const tempGain = {val: 0, name:''};
            const tempLoss = {val: 0, name:''};
            const tempResults = [];
            // Finding top gain/loss
            arr1.forEach((char, key) => {
                console.log(`${key} => ${char.rank} to ${arr2.get(key).rank}`);
                tempResults.push(`${key} => ${char.rank} to ${arr2.get(key).rank}`);
                let change = char.rank - arr2.get(key).rank;
                // Pushing results based on change
                if (change > 0) {
                    tempResults.push({msg:`${key} => ${char.rank} to ${arr2.get(key).rank}`, type:'gainer'});
                } else if (change < 0) {
                    tempResults.push({msg:`${key} => ${char.rank} to ${arr2.get(key).rank}`, type:'loser'});
                } else {
                    tempResults.push({msg:`${key} => ${char.rank} to ${arr2.get(key).rank}`, type:'neutral'});}
                // Updating top gain/loss if necessary
                if (change > tempGain.val){
                    tempGain.val = change;
                    tempGain.name = key;
                } else if (change < tempLoss.val){
                    tempLoss.val = change;
                    tempLoss.name = key;
                }
            });
            // Updating states with results
            setLargestGain(tempGain);
            setLargestLoss(tempLoss);
            setResults(tempResults);
        };
        read();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setDisplayMsg(`Comparing ${firstDate} and ${secondDate}`);
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
                            <input type='text' placeholder='YYYY-MM-DD' value={firstDate} onChange={(e) => setFirstDate(e.target.value)}/>
                        </div>
                        <div className='formControl'>
                            <label>Second Date</label>
                            <input type='text' placeholder='YYYY-MM-DD' value={secondDate} onChange={(e) => setSecondDate(e.target.value)}/>
                        </div>
                        <input type='submit' value='Compare' className='btn btn-block'/>
                    </form>
                </div>
                {displayMsg.length > 0 && (<p>{displayMsg}</p>)}
                {largestGain.name.length > 0 ? (<p>{`largest gain: ${largestGain.name}, ${largestGain.val}`}</p>) : (<p>largest gain:</p>)}
                {largestLoss.name.length > 0 ? (<p>{`largest loss: ${largestLoss.name}, ${largestLoss.val}`}</p>) : (<p>largest loss:</p>)}
                <button onClick={() => setShowDetails(!showDetails)} className='btn btn-block'>Show Details</button>
                {(results.length > 0 && showDetails) && (<CompareDetails results={results}/>)}
            </div>
        </div>
    )
}

export default Compare