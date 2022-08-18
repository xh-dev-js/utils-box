import {useEffect, useState} from "react";
import {TextAreaModule} from "../bootstrap/TextArea";
import {CheckBoxModule} from "../bootstrap/CheckBox";
import {InputRowModule} from "../bootstrap/InputRow";

export module TimeConversion{
    export const UI = () => {
        const [value,setValue] = useState('')
        const [outPut,setOutput] = useState('')
        const [outPutForm2,setOutputFrom2] = useState('')

        enum CheckedState {
            ms, s
        }

        const [checked,setChecked] = useState(CheckedState.ms)
        useEffect(()=>{
            try{
                const time = parseInt(value,10)
                if(checked == CheckedState.ms){
                    setOutput(new Date(time).toISOString())
                    setOutputFrom2((time/1000).toFixed(0))
                }
                else{
                    setOutput(new Date(time*1000).toISOString())
                    setOutputFrom2((time*1000).toFixed(0))
                }
            }
            catch (e){
                console.error(e)
            }
        },[value, checked])


        return (
            <>
                <CheckBoxModule.CheckBox checkedIf={CheckedState.ms} title={'ms'} setChecked={t=>setChecked(t)} generalName={'ms'} checked={checked}/>
                <CheckBoxModule.CheckBox checkedIf={CheckedState.s} title={'s'} setChecked={t=>setChecked(t)} generalName={'ms'} checked={checked}/>
                <TextAreaModule.TextArea value={value} doubleClickToPaste={true} updateCallback={(e)=>setValue(e)}/>
                <InputRowModule.InputRow title={checked==CheckedState.ms ? 'Second' : 'Milisecond'} value={outPutForm2} doubleClickToCopy={true}/>
                <InputRowModule.InputRow title={'Date'} value={outPut} doubleClickToCopy={true}/>
            </>
        )
    }
}