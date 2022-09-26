import React from 'react'
import Header from './Header'
import {getDocs, collection, orderBy, query} from 'firebase/firestore'
import { firestore } from '../config.js';
import { useState } from 'react'

const Snapshots = () => {
    const [date, setDate] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <Header/>
            <div className='snapshotsWrapper'>
                <h1>Snapshots</h1>
                <div className='snapshotsFormWrapper'>
                        <form className='snapshotsForm' onSubmit={onSubmit}>
                            <div className='formControl'>
                                <label>Date</label>
                                <input type='text' placeholder='YYYY-MM-DD' value={date} onChange={(e) => setDate(e.target.value)}/>
                            </div>
                            <input type='submit' value='Get Snapshot' className='btn btn-block'/>
                        </form>
                    </div>
            </div>
        </div>
    )
}

export default Snapshots