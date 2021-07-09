import React, {useEffect} from "react";
import {CheckBoxModule} from "../bootstrap/CheckBox";
import {TextAreaModule} from "../bootstrap/TextArea";


const {useState} = React

const UrlEncoder = () => {
    enum CheckedState {
        encodeUri, encodeUriComponent
    }
    const [useDecodeUri, setUseDecodeUri] = useState(CheckedState.encodeUri)
    const [inputValue, setInputValue] = useState('')
    const [decodedValue, setDecodedValue] = useState('')

    useEffect(()=>{
        decoding(inputValue)
    },[useDecodeUri])

    let decoding = (str:string) =>{
        setInputValue(str);
        try{
            const result = useDecodeUri ? decodeURI(str) : decodeURIComponent(str)
            setDecodedValue(result)
        }
        catch (e) {
            setDecodedValue('Fail to encode')
        }
    }


    return (
        <>
            <CheckBoxModule.CheckBox title="decodeURI" generalName="decode_uri_radio" checked={useDecodeUri} checkedIf={CheckedState.encodeUri}
                                     setChecked={(checkIf) => setUseDecodeUri(checkIf)}/>
            <CheckBoxModule.CheckBox title="decodeURIComponent" generalName="decode_uri_component_radio"
                                     checked={useDecodeUri} checkedIf={CheckedState.encodeUriComponent} setChecked={(checkIf) => setUseDecodeUri(checkIf)}/>
            <TextAreaModule.TextArea value={inputValue} updateCallback={text => decoding(text)}
                                     doubleClickToPaste={true}/>
            <TextAreaModule.TextArea value={decodedValue} updateCallback={text => {
                decoding(text)
            }} doubleClickToCopy={true}/>
        </>
    )
}

export default UrlEncoder