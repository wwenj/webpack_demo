import React, { useEffect } from 'react'
import './style.css'
export default function Home() {
    useEffect(() => {
        console.log('init')
        console.log(_WEBPACK_MODE_)
    }, [])
    return <div className="home">
        <h2>react,111112222233133445</h2>
        <h2>react,111112222233133445</h2>
        <h2>react,111112222233133445</h2>
        <h2>react,11111222223313344544</h2>
        {
            _WEBPACK_MODE_ === 'production' ? <h1>production</h1> : <h1>development</h1>
        }
    </div>
}