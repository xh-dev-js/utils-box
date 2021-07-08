import React, {useState} from "react";
import CryptoJS from "crypto-js"
import {TextAreaModule} from "../bootstrap/TextArea";

const Base64Decoder = () => {
    const [inputValue, setInputValue] = useState('')
    const [resultValue, setResultValue] = useState('')

    let decoding = (text: string) => {
        setInputValue(text)
        try {
            let msg = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(text))
            setResultValue(msg)
        } catch (e) {
            setResultValue("error")
        }
    }

    return (
        <>
            <TextAreaModule.TextArea value={inputValue} updateCallback={text => decoding(text)}
                                     doubleClickToPaste={true} rows={4}
            />
            <TextAreaModule.TextArea value={resultValue} updateCallback={text => setResultValue(text)}
                                     doubleClickToCopy={true} rows={4}/>
        </>
    )
}

export default Base64Decoder