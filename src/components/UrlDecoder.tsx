import React, {useEffect} from "react";
import {CheckBoxModule} from "../bootstrap/CheckBox";
import {TextAreaModule} from "../bootstrap/TextArea";
import {StringUtils} from "pyyqww_t1/dist";


const {useState} = React

const UrlEncoder = () => {
    const [useDecodeUri, setUseDecodeUri] = useState(true)
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

    let componentName = "URL Decoder"

    return (
        <div className={StringUtils.nameStyleDelimiter(componentName)}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{componentName}</h5>
                    <CheckBoxModule.CheckBox title="decodeURI" generalName="decode_uri_radio" checked={useDecodeUri} setChecked={(_)=>setUseDecodeUri(true)}/>
                    <CheckBoxModule.CheckBox title="decodeURIComponent" generalName="decode_uri_component_radio" checked={!useDecodeUri} setChecked={(_)=>setUseDecodeUri(false)}/>
                    {/*<textarea className={'form-control'} value={inputValue} onChange={e=>decoding(e.target.value)}/>*/}
                    <TextAreaModule.TextArea value={inputValue} updateCallback={text=>decoding(text)} doubleClickToPaste={true}/>
                    <TextAreaModule.TextArea value={decodedValue} updateCallback={text=>{decoding(text)}} doubleClickToCopy={true}/>
                    {/*<textarea className={'form-control'} value={decodedValue} disabled={true}/>*/}
                </div>
            </div>
        </div>
    )
}

export default UrlEncoder