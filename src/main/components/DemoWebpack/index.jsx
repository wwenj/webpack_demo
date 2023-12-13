import React, { useEffect } from 'react'
import './style.css'
export default function Home() {
    return <div className="DemoWebpack">
        <h1>webpack</h1>
        <img src={require('../../assets/img/webpack.png')} alt="" />
    </div>
}