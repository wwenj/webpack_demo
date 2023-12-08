import React, { useEffect } from 'react'
import './style.css'
export default function Home() {
    useEffect(() => {
        console.log('init1')
        console.log(_WEBPACK_MODE_)
    }, [])
    return <div className="home">
        <h2>react99412999</h2>
        {
            _WEBPACK_MODE_ === 'production' ? <h1>production</h1> : <h1>development</h1>
        }
    </div>
}