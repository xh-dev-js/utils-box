import React, {DragEvent as ReactDragEvent} from "react";
import {TextAreaModule} from "../bootstrap/TextArea";
import {InputRowModule} from "../bootstrap/InputRow";
import CryptoJS from "crypto-js";
import {DragDropUtils} from "../helper/DragDropUtils";
import {ByteUtils} from "pyyqww_t1/dist";

const {useState} = React

const Sha1Hash = () => {
    const [inputValue, setInputValue] = useState('')
    const [resultB64Value, setResultB64Value] = useState('')
    const [resultHexValue, setResultHexValue] = useState('')

    let hashing = (str: string) => {
        setInputValue(str);
        try {
            const hash = CryptoJS.SHA1(str)
            setResultB64Value(CryptoJS.enc.Base64.stringify(hash))
            setResultHexValue(CryptoJS.enc.Hex.stringify(hash))
        } catch (e) {
            setResultB64Value("Error")
            setResultHexValue("Error")
        }
    }

    const dropFile = (ev: ReactDragEvent) => {
        ev.preventDefault()
        const file = DragDropUtils.extractFileFromDragEvent(ev)
        if (file !== null) {
            file.arrayBuffer()
                .then(bf => {
                    const wordArray = ByteUtils.loadWordArrayFromArrayBuffer(bf)
                    const md5 = CryptoJS.SHA1(wordArray)
                    setResultB64Value(CryptoJS.enc.Base64.stringify(md5))
                    setResultHexValue(CryptoJS.enc.Hex.stringify(md5))
                })
                .catch(e => {
                    setResultB64Value("Error handling drop file")
                    setResultHexValue("Error handling drop file")
                })
        }
    }

    return (
        <>
            <TextAreaModule.TextArea value={inputValue} updateCallback={text => hashing(text)}
                                     doubleClickToPaste={true}
                                     droppable={true}
                                     onDropCallback={ev => dropFile(ev)}
            />
            <InputRowModule.InputRow title={'Base64'} value={resultB64Value}/>
            <InputRowModule.InputRow title={'Hex'} value={resultHexValue}/>
        </>
    )
}

export default Sha1Hash