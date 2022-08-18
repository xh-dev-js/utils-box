import React from "react";
import {TextAreaModule} from "../bootstrap/TextArea";
import {CheckBoxModule} from "../bootstrap/CheckBox";


const {useState} = React
const {useEffect} = React

export const GeoIp = () => {
    enum CheckedState {
        city, country, asn
    }

    const [checked, setChecked] = useState(CheckedState.city)
    const [inputValue, setInputValue] = useState('')
    const [resultValue, setResultValue] = useState('')

    const query = async (text: string) => {
        if (text) {
            try {
                const host = "http://localhost:8080"
                // const host = "http://10.10.0.7:8080"
                // const host = "https://w.dextro.link/geoip"
                let url: string = ""
                switch (checked) {
                    case CheckedState.asn:
                        url = `${host}/ip/asn/simple/${text}`
                        break;
                    case CheckedState.country:
                        url = `${host}/ip/country/simple/${text}`
                        break;
                    case CheckedState.city:
                        url = `${host}/ip/city/simple/${text}`
                        break;
                }

                const result = await fetch(url).then(resp => resp.text())
                setResultValue(result)
            } catch (e) {
                setResultValue("Fail to fetch geoip: " + text)
            }
        }
    }
    useEffect(()=>{
        query(inputValue)
            .then(()=>{})
    },[inputValue,checked])

    return (
        <>
            <CheckBoxModule.CheckBox title="City" generalName="ip_search_mode" checkedIf={CheckedState.city}
                                     checked={checked}
                                     setChecked={(value) => setChecked(value)}/>
            <CheckBoxModule.CheckBox title="Country" generalName="ip_search_mode" checkedIf={CheckedState.country}
                                     checked={checked}
                                     setChecked={(value) => setChecked(value)}/>
            <CheckBoxModule.CheckBox title="asn" generalName="ip_search_mode" checkedIf={CheckedState.asn}
                                     checked={checked}
                                     setChecked={(value) => setChecked(value)}/>
            <TextAreaModule.TextArea value={inputValue} updateCallback={setInputValue}
                                     doubleClickToPaste={true}/>
            <TextAreaModule.TextArea value={resultValue} doubleClickToCopy={true} updateCallback={_=>{}}/>
        </>
    )
}
