import React from "react";
import {BootstrapHelper} from "./BootstrapHelper";
import {ClipboardUtils} from "pyyqww_t1/dist";

export module InputEditableRowModule {
    type InputEditableRowProps = {
        extraClassName: string;
        title: string;
        boldTitle: boolean;
        generalName?: string;
        value: string | number | boolean;
        doubleClickToCopy: boolean;
        setValue: (s: string)=>void;
    }
    // export const CheckBox = (generalName: string, checked: boolean, setChecked: (checked: boolean)=>void) => {
    export const InputEditableRow = (props: InputEditableRowProps) => {
        const pair = new BootstrapHelper.IdNamePair(
            props.generalName === undefined ? `generated_${props.title.replace(' ', '_')}` : props.generalName
        )
        return (
            <>
                <div className={"mb-3 row " + props.extraClassName}
                     onDoubleClick={() => ClipboardUtils.copy(String(props.value))}
                     title={'Double click to copy'}
                >
                    <label htmlFor={pair.id()} className="col-xs-5 col-sm-2 col-form-label">
                        {
                            props.boldTitle? <b>{props.title}</b>: props.title
                        }
                    </label>
                    <div className="col-xs-7 col-sm-10">
                        <input type="text" className="form-control-plaintext" id={pair.id()}
                               value={String(props.value)}
                               onChange={e=>props.setValue(e.target.value)}
                        />
                    </div>
                </div>
            </>
        )
    }

    InputEditableRow.defaultProps = {
        extraClassName: '',
        doubleClickToCopy: true,
        boldTitle: true,
    }
}
