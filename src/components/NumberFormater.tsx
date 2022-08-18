import React, {useEffect} from "react";
import {TextAreaModule} from "../bootstrap/TextArea";
import {InputRowModule} from "../bootstrap/InputRow";
import {CheckBoxModule} from "../bootstrap/CheckBox";

const {useState} = React

export const NumberRepresentations = () => {
    enum CheckedState {
        binary, dec, oct, hex
    }
    const [inputValue] = useState('')
    const [resultBinaryValue, setResultBinaryValue] = useState('')
    const [resultDecValue, setResultDecValue] = useState('')
    const [resultOctValue, setResultOctValue] = useState('')
    const [resultHexValue, setResultHexValue] = useState('')

    const custParseFloat = (str: string, radix: number) => {
        var parts = str.split(".");
        if (parts.length > 1) {
            return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length);
        }
        return parseInt(parts[0], radix);
    }
    const update = (text: string) => {
        try {
            // setInputValue(text)
            let num: number
            switch (checked) {
                case CheckedState.binary:
                    num = custParseFloat(text, 2)
                    break;
                case CheckedState.oct:
                    num = custParseFloat(text, 8)
                    break;
                case CheckedState.dec:
                    num = parseFloat(text)
                    break;
                case CheckedState.hex:
                    num = custParseFloat(text, 16)
                    break;
            }

            setResultBinaryValue(num.toString(2))
            setResultOctValue("0" + num.toString(8))
            setResultDecValue(num.toString(10))
            setResultHexValue("0x" + num.toString(16))
        } catch (e) {
            console.log(e)
        }
    }


    const [checked, setChecked] = useState(CheckedState.dec)

    const checkBoxColStyle = 'col-1'

    useEffect(()=>{
        update(inputValue)
    },[checked,inputValue])

    return (
        <>
            <div className={'row'}>
                <CheckBoxModule.CheckBox title="Binary" generalName="number_format" checkedIf={CheckedState.binary}
                                         custClassName={checkBoxColStyle}
                                         checked={checked}
                                         setChecked={(value) => setChecked(value)}/>
                <CheckBoxModule.CheckBox title="Oct" generalName="number_format" checkedIf={CheckedState.oct}
                                         custClassName={checkBoxColStyle}
                                         checked={checked}
                                         setChecked={(value) => setChecked(value)}/>
                <CheckBoxModule.CheckBox title="Dec" generalName="number_format" checkedIf={CheckedState.dec}
                                         custClassName={checkBoxColStyle}
                                         checked={checked}
                                         setChecked={(value) => setChecked(value)}/>
                <CheckBoxModule.CheckBox title="Hex" generalName="number_format" checkedIf={CheckedState.hex}
                                         custClassName={checkBoxColStyle}
                                         checked={checked}
                                         setChecked={(value) => setChecked(value)}/>
                <TextAreaModule.TextArea value={inputValue} updateCallback={text => update(text)}
                                         doubleClickToPaste={true}
                                         droppable={false}
                />
            </div>
            <InputRowModule.InputRow title={'Binary'} value={resultBinaryValue}/>
            <InputRowModule.InputRow title={'Oct'} value={resultOctValue}/>
            <InputRowModule.InputRow title={'Decimal'} value={resultDecValue}/>
            <InputRowModule.InputRow title={'Hex'} value={resultHexValue}/>
        </>
    )
}