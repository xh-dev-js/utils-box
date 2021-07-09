import React from "react";
import {BootstrapHelper} from "./BootstrapHelper";

export module CheckBoxModule{
    type CheckBoxProps<T> = {
        title: string;
        generalName: string;
        checkedIf: T;
        checked: T;
        setChecked: (checked: T) => void;
        custClassName: string;
    }
    // export const CheckBox = (generalName: string, checked: boolean, setChecked: (checked: boolean)=>void) => {
    export const CheckBox = (props:CheckBoxProps<any>) => {
        const pair = new BootstrapHelper.IdNamePair(props.generalName+"_"+props.checkedIf.toString())
        return (
            <>
                <div className={'form-check'+(props.custClassName?" "+props.custClassName:'')}>
                    <input className="form-check-input" type="radio"
                           name={pair.name()}
                           id={pair.id()}
                           checked={props.checkedIf === props.checked}
                           onChange={()=> props.setChecked(props.checkedIf)}
                    />
                    <label className="form-check-label" htmlFor={pair.id()}>
                        {props.title}
                    </label>
                </div>
            </>
        )
    }

    CheckBox.defaultProps = {
        custClassName: '',
    }
}