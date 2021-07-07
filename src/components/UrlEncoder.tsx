import React from "react";
import {CheckBoxModule} from "../bootstrap/CheckBox";
import {TextAreaModule} from "../bootstrap/TextArea";
import {StringUtils} from "pyyqww_t1/dist";


const {useState} = React
const {useEffect} = React

const UrlEncoder = () => {
    const [useEncodeUri, setUseEncodeUri] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const [encodedValue, setEncodedValue] = useState('')

    useEffect(() => {
        encoding(inputValue)
    }, [useEncodeUri])


    let encoding = (str: string) => {
        setInputValue(str);
        try {
            const result = useEncodeUri ? encodeURI(str) : encodeURIComponent(str);
            setEncodedValue(result)
        } catch (e) {
            setEncodedValue('Fail to encode')
        }
    }

    let componentName = "URL Encoder"

    return (
        <div className={StringUtils.nameStyleDelimiter(componentName)}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{componentName}</h5>
                    <CheckBoxModule.CheckBox title="encodeURI" generalName="encode_uri_radio" checked={useEncodeUri}
                                             setChecked={(_) => setUseEncodeUri(true)}/>
                    <CheckBoxModule.CheckBox title="encodeURIComponent" generalName="encode_uri_component_radio"
                                             checked={!useEncodeUri} setChecked={(_) => setUseEncodeUri(false)}/>
                    <TextAreaModule.TextArea value={inputValue} updateCallback={text => encoding(text)}
                                             doubleClickToPaste={true}/>
                    <TextAreaModule.TextArea value={encodedValue} updateCallback={text => encoding(text)}
                                             doubleClickToCopy={true}/>
                </div>
            </div>
        </div>
    )
}

export default UrlEncoder