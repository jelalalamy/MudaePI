import Test from './components/Test';
import Tiles from './components/Tiles';
import Tile from './components/Tile';
import { useState, useEffect } from 'react'
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import { firestore } from './config.js';

function App() {
  const [results, setResults] = useState([]);

    useEffect(() => {
        const getResults = async () => {
            const ref = collection(firestore, "2022-08-29");
            const q = query(ref, orderBy("rank"));
            const querySnapshot = await getDocs(q);
            const res = querySnapshot.docs.map(doc => doc.data());
            setResults(res);
            //console.log(querySnapshot);
        }
        getResults()
        console.log(results);
    }, [])

  return (
    <div className="App">
      <h1>MudaePI</h1>
      <Test/>
      {results.length > 0 ? <Tiles chars={results}/> : 'No characters to show.'}
    </div>
  );
}

export default App;
