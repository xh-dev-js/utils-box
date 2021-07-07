import React from "react";
import {BootstrapHelper} from "./BootstrapHelper";
import {ClipboardUtils} from "pyyqww_t1/dist";

export module InputRowModule {
    type InputRowProps = {
        title: string;
        generalName?: string;
        value: string | number | boolean;
        isReadOnly: boolean;
        isDisabled: boolean;
        doubleClickToCopy: boolean;
    }
    // export const CheckBox = (generalName: string, checked: boolean, setChecked: (checked: boolean)=>void) => {
    export const InputRow = (props: InputRowProps) => {
        const pair = new BootstrapHelper.IdNamePair(
            props.generalName === undefined ? `generated_${props.title.replace(' ', '_')}` : props.generalName
        )
        return (
            <>
                <div className="mb-3 row"
                     onDoubleClick={() => ClipboardUtils.copy(String(props.value))}
                >
                    <label htmlFor={pair.id()} className="col-sm-2 col-form-label">{props.title}</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly={props.isReadOnly} className="form-control-plaintext" id={pair.id()}
                               disabled={props.isDisabled}
                               value={String(props.value)}
                        />
                    </div>
                </div>
            </>
        )
    }

    InputRow.defaultProps = {
        isReadOnly: true,
        isDisabled: true,
        doubleClickToCopy: true,
    }
}