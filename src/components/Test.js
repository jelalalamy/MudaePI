import React from 'react'
import { useState, useEffect } from 'react'
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import { firestore } from '../config.js';

const Test = ({ results }) => {
    const [resultsString, setResultsString] = useState("");

    useEffect(() => {
        let resultsString2 = "";
        results.forEach((doc) => {
            resultsString2 = resultsString2.concat(`${JSON.stringify(doc, null, 4)},`, "\n");
        })
        setResultsString(resultsString2);
    })

    return (
        <pre id="test">{resultsString}</pre>
    )
}

export default Test