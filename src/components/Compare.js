import React from 'react'
import Header from './Header'
import { useState } from 'react'

const Compare = () => {
    const [firstDate, setFirstDate] = useState('');
    const [secondDate, setSecondDate] = useState('');
    const [displayMsg, setDisplayMsg] = useState('');

    const compareDates = () => {
    //     let firstDate = new Date(args[0].split('-')[0], args[0].split('-')[1]-1, args[0].split('-')[2]);
    //     let secondDate = new Date(args[1].split('-')[0], args[1].split('-')[1]-1, args[1].split('-')[2]);
    //     if (firstDate < secondDate) [firstDate, secondDate] = [secondDate, firstDate];
    //     console.log(`Comparing dates ${firstDate.toISOString().substring(0,10)} and ${secondDate.toISOString().substring(0,10)}`);

    //     let arr1 = new Map();
    //     let arr2 = new Map();

    //     const read = async () => {
    //         const querySnapshot1 = await getDocs(query(collection(firestore, firstDate.toISOString().substring(0,10)), orderBy("rank")));
    //         querySnapshot1.forEach((doc) => {
    //             arr1.set(doc.data().name, doc.data());
    //         });
    //         const querySnapshot2 = await getDocs(query(collection(firestore, secondDate.toISOString().substring(0,10)), orderBy("rank")));
    //         querySnapshot2.forEach((doc) => {
    //             arr2.set(doc.data().name, doc.data());
    //         });
    //         const largestGain = {val: 0};
    //         const largestLoss = {val: 0};
    //         arr1.forEach((char, key) => {
    //             console.log(`${key} => ${char.rank} to ${arr2.get(key).rank}`);
    //             let change = char.rank - arr2.get(key).rank;
    //             if (change < largestGain.val){
    //                 largestGain.val = change;
    //                 largestGain.name = key;
    //             } else if (change > largestLoss.val){
    //                 largestLoss.val = change;
    //                 largestLoss.name = key;
    //             }
    //         });
    //         channel.send(`Largest gain: ${largestGain.name}, ${largestGain.val}\n`+
    //                     `Largest loss: ${largestLoss.name}, ${largestLoss.val}`);
    //     };
    //     read();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setDisplayMsg(`Comparing ${firstDate} and ${secondDate}`);
        compareDates();
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
                            <input type='text' placeholder='MM-DD-YYYY' value={firstDate} onChange={(e) => setFirstDate(e.target.value)}/>
                        </div>
                        <div className='formControl'>
                            <label>Second Date</label>
                            <input type='text' placeholder='MM-DD-YYYY' value={secondDate} onChange={(e) => setSecondDate(e.target.value)}/>
                        </div>
                        <input type='submit' value='Compare'/>
                    </form>
                </div>
                {displayMsg.length >0 && (<p>{displayMsg}</p>)}
            </div>
        </div>
    )
}

export default Compare