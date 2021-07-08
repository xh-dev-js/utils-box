import React, {useEffect, useState} from "react";
import {ClipboardUtils} from "pyyqww_t1/dist";

const MyIp = () => {
    const [ip, setIp] = useState('')

    async function fetchMoviesJSON() {
        const response = await fetch('https://api.my-ip.io/ip');
        const ip = await response.text();
        return ip;
    }

    useEffect(() => {
        fetchMoviesJSON().then(fetchedIp => {
            setIp(fetchedIp)
        })
            .catch(e=>{
                console.log(e)
                setIp("fail to detect ip")
            })
        ;
    },[])
    return (
        <div className={'topBar-item'} title={'double click to copy'} onDoubleClick={()=>ClipboardUtils.copy(ip)}>
            <span className={'topText'}>My Ip: <b>{ip}</b></span>
        </div>
    )
}

export default MyIp