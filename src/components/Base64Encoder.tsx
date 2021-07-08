import React, {DragEvent as ReactDragEvent, useState} from "react";
import CryptoJS from "crypto-js"
import {TextAreaModule} from "../bootstrap/TextArea";
import {ByteUtils} from "pyyqww_t1/dist";
import {DragDropUtils} from "../helper/DragDropUtils";

const Base64Encoder = () => {
    const [inputValue, setInputValue] = useState('')
    const [resultValue, setResultValue] = useState('')

    let encoding = (text: string)=>{
        setInputValue(text)
        try{
            let msg = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
            setResultValue(msg)
        }
        catch (e){
            setResultValue("error")
        }
    }

    const dropFile = (ev: ReactDragEvent) => {
        ev.preventDefault()
        const file = DragDropUtils.extractFileFromDragEvent(ev)
        if (file !== null) {
            file.arrayBuffer()
                .then(bf => {
                    const wordArray = ByteUtils.loadWordArrayFromArrayBuffer(bf)
                    const base64 = CryptoJS.enc.Base64.stringify(wordArray)
                    setResultValue(base64)
                })
                .catch(e => {
                    setResultValue("Fail to process: "+inputValue)
                })
        }
    }

    return (
        <>
            <TextAreaModule.TextArea value={inputValue} updateCallback={text => encoding(text)}
                                     doubleClickToPaste={true} rows={4}
                                     droppable={true}
                                     onDropCallback={e => {
                                         dropFile(e)
                                     }}
            />
            <TextAreaModule.TextArea value={resultValue} updateCallback={text => setResultValue(text)}
                                     doubleClickToCopy={true} rows={4}/>
        </>
    )
}

export default Base64Encoder