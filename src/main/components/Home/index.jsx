import React, { useEffect } from 'react'
import DemoWebpack from '../DemoWebpack/index.jsx'
import DemoReact from '../DemoReact/index.jsx'
import './style.css'
export default function Home() {
    useEffect(() => {
        console.log('当前环境：', _WEBPACK_MODE_)
    }, [])
    return <div className="home">
        <h2 className='home_title'>当前环境：{_WEBPACK_MODE_}</h2>
        <DemoWebpack/>
        <DemoReact />
    </div>
}