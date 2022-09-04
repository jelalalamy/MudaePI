import React from 'react'
import { useState, useEffect } from 'react'
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import { firestore } from '../config.js';

const Test = () => {
    const [results, setResults] = useState("");

    useEffect(() => {
        const getResults = async () => {
            const ref = collection(firestore, "2022-08-29");
            const q = query(ref, orderBy("rank"));
            const querySnapshot = await getDocs(q);
            let resultString = "";
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                resultString = resultString.concat(`${doc.id} => ${JSON.stringify(doc.data())}`, "\n");
            });
            setResults(resultString);
        }
        getResults()
        //console.log(results);
      }, [])

    return (
        <p id="test">{results}</p>
    )
}

export default Test