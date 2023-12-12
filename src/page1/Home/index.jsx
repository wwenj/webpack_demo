import React, { useEffect } from 'react'
import './style.css'
export default function Home() {
    useEffect(() => {
        console.log('page1')
        console.log(_WEBPACK_MODE_)
    }, [])
    return <div className="home">
        <h2>page1</h2>
        <img src="./img/img1.png" alt="" />
        <img src="./img/img2.png" alt="" />
        {
            _WEBPACK_MODE_ === 'production' ? <h1>production</h1> : <h1>development</h1>
        }
    </div>
}