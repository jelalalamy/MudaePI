import React from 'react'
import Test from './Test';
import Tiles from './Tiles';
import Header from './Header';
import { useState, useEffect } from 'react'
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import { firestore } from '../config.js';

const Home = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const getResults = async () => {
            const ref = collection(firestore, "2022-09-08");
            const q = query(ref, orderBy("rank"));
            const querySnapshot = await getDocs(q);
            const res = querySnapshot.docs.map(doc => doc.data());
            console.log("Fetching results");
            setResults(res);
            //console.log(querySnapshot);
        }
        getResults()
        console.log(results);
    }, [])

    return (
        <div className="Home">
            <Header/>
            <Test/>
            {results.length > 0 ? <Tiles chars={results}/> : 'No characters to show.'}
        </div>
    );
}

export default Home