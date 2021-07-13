import React from "react";
import {BootstrapHelper} from "./BootstrapHelper";
import {ClipboardUtils} from "pyyqww_t1/dist";

export module InputRowModule {
    type InputRowProps = {
        extraClassName: string;
        title: string;
        boldTitle: boolean;
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
                <div className={"mb-3 row " + props.extraClassName}
                     onDoubleClick={() => ClipboardUtils.copy(String(props.value))}
                     title={'Double click to copy'}
                >
                    <label htmlFor={pair.id()} className="col-sm-2 col-form-label">
                        {
                            props.boldTitle? <b>{props.title}</b>: props.title
                            // props.boldTitle ? "ab" : "cd"
                        }
                    </label>
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
        extraClassName: '',
        isReadOnly: true,
        isDisabled: true,
        doubleClickToCopy: true,
        boldTitle: true
    }
}