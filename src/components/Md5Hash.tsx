import React, {DragEvent as ReactDragEvent} from "react";
import {TextAreaModule} from "../bootstrap/TextArea";
import {InputRowModule} from "../bootstrap/InputRow";
import CryptoJS from "crypto-js";
import {ByteUtils, StringUtils} from "pyyqww_t1/dist";
import {DragDropUtils} from "../helper/DragDropUtils";

const {useState} = React

const Md5Hash = () => {
    // const [useDecodeUri, setUseDecodeUri] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const [resultB64Value, setResultB64Value] = useState('')
    const [resultHexValue, setResultHexValue] = useState('')

    let hashing = (str: string) => {
        setInputValue(str);
        try {
            const hash = CryptoJS.MD5(str)
            setResultB64Value(CryptoJS.enc.Base64.stringify(hash))
            setResultHexValue(CryptoJS.enc.Hex.stringify(hash))
        } catch (e) {
            setResultB64Value("Error")
            setResultHexValue("Error")
        }
    }

    let componentName = "MD5 Hasher"

    const dropFile = (ev: ReactDragEvent) => {
        ev.preventDefault()
        const file = DragDropUtils.extractFileFromDragEvent(ev)
        if (file !== null) {
            file.arrayBuffer()
                .then(bf => {
                    const wordArray = ByteUtils.loadWordArrayFromArrayBuffer(bf)
                    const md5 = CryptoJS.MD5(wordArray)
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
        <div className={StringUtils.nameStyleDelimiter(componentName)}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{componentName}</h5>
                    <TextAreaModule.TextArea value={inputValue} updateCallback={text => hashing(text)}
                                             droppable={true}
                                             doubleClickToPaste={true}
                                             onDropCallback={ev => dropFile(ev)}
                    />
                    <InputRowModule.InputRow title={'Base64'} value={resultB64Value}/>
                    <InputRowModule.InputRow title={'Hex'} value={resultHexValue}/>
                </div>
            </div>
        </div>
    )
}

export default Md5Hash