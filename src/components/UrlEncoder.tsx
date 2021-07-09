import React from "react";
import {CheckBoxModule} from "../bootstrap/CheckBox";
import {TextAreaModule} from "../bootstrap/TextArea";


const {useState} = React
const {useEffect} = React

const UrlEncoder = () => {
    enum CheckedState {
        encodeUri, encodeUriComponent
    }
    const [useEncodeUri, setUseEncodeUri] = useState(CheckedState.encodeUri)
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


    return (
        <>
            <CheckBoxModule.CheckBox title="encodeURI" generalName="encode_uri_radio" checked={useEncodeUri}
                                     checkedIf={CheckedState.encodeUri} setChecked={(checkIf) => setUseEncodeUri(checkIf)}/>
            <CheckBoxModule.CheckBox title="encodeURIComponent" generalName="encode_uri_component_radio"
                                     checked={useEncodeUri} checkedIf={CheckedState.encodeUriComponent} setChecked={(checkIf) => setUseEncodeUri(checkIf)}/>
            <TextAreaModule.TextArea value={inputValue} updateCallback={text => encoding(text)}
                                     doubleClickToPaste={true}/>
            <TextAreaModule.TextArea value={encodedValue} updateCallback={text => encoding(text)}
                                     doubleClickToCopy={true}/>
        </>
    )
}

export default UrlEncoder