import React from "react";
import {TextAreaModule} from "../bootstrap/TextArea";


const {useState} = React
const {useEffect} = React

export const GeoIp = () => {
    const [inputValue, setInputValue] = useState('')
    const [resultValue, setResultValue] = useState('')

    const query = async (text: string) => {
        if (text) {
            try{
                const result = await fetch("https://w.dextro.link/geoip/country/" + text).then(resp => resp.text())
                setResultValue(result)
            }
            catch (e){
                setResultValue("Fail to fetch geoip: "+text)
            }
        }
    }
    useEffect(()=>{
        query(inputValue)
    },[inputValue])

    return (
        <>
            <TextAreaModule.TextArea value={inputValue} updateCallback={setInputValue}
                                     doubleClickToPaste={true}/>
            <TextAreaModule.TextArea value={resultValue} doubleClickToCopy={true}/>
        </>
    )
}