import React from "react";
import {BootstrapHelper} from "./BootstrapHelper";

export module CheckBoxModule{
    type CheckBoxProps = {
        title: string;
        generalName: string;
        checked: boolean;
        setChecked: (checked: boolean) => void;
    }
    // export const CheckBox = (generalName: string, checked: boolean, setChecked: (checked: boolean)=>void) => {
    export const CheckBox = (props:CheckBoxProps) => {
        const pair = new BootstrapHelper.IdNamePair(props.generalName)
        return (
            <>
                <div className='form-check'>
                    <input className="form-check-input" type="radio"
                           name={pair.name()}
                           id={pair.id()}
                           checked={props.checked}
                           onChange={()=> props.setChecked(true)}
                    />
                    <label className="form-check-label" htmlFor={pair.id()}>
                        {props.title}
                    </label>
                </div>
            </>
        )
    }
}