import React, {DragEvent as ReactDragEvent, useState} from "react";
import CryptoJS from "crypto-js"
import {TextAreaModule} from "../bootstrap/TextArea";
import {ByteUtils, StringUtils} from "pyyqww_t1/dist";
import {DragDropUtils} from "../helper/DragDropUtils";

const Base64Encoder = () => {
    const [inputValue, setInputValue] = useState('')
    const [resultValue, setResultValue] = useState('')

    let componentName = "Base64 Decode"

    let decoding = (text: string)=>{
        setInputValue(text)
        try{
            let msg = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(text))
            setResultValue(msg)
        }
        catch (e){
            setResultValue("error")
        }
    }

    return (
        <div className={StringUtils.nameStyleDelimiter(componentName)}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{componentName}</h5>
                    <TextAreaModule.TextArea value={inputValue} updateCallback={text=>decoding(text)} doubleClickToPaste={true} rows={4}
                    />
                    <TextAreaModule.TextArea value={resultValue} updateCallback={text=>setResultValue(text)} doubleClickToCopy={true} rows={4}/>
                </div>
            </div>
        </div>
    )
}

export default Base64Encoder