import React, {DragEvent as ReactDragEvent, useState} from "react";
import {ClipboardUtils} from "pyyqww_t1/dist";
import {DragDropUtils} from "../helper/DragDropUtils";

export module TextAreaModule {
    type TextAreaProps = {
        value: string;
        updateCallback: (text: string) => void;
        onDropCallback: (ev: ReactDragEvent) => void;
        doubleClickToPaste: boolean;
        doubleClickToCopy: boolean;
        droppable: boolean;
        rows: number;
    }
    export const TextArea = (props: TextAreaProps) => {
        const [tempValue, setTempValue] = useState('')

        if (props.doubleClickToPaste && props.doubleClickToCopy) {
            console.error("Double binding to both copy and paste")
            props.doubleClickToCopy = false
            props.doubleClickToPaste = false
        }

        const update = (text: string) => {
            // setInputValue(text)
            props.updateCallback(text)
        }

        const pasteFromClipboard = () => {
            ClipboardUtils.getText()
                .then(text => {
                    // setInputValue(text)
                    props.updateCallback(text)
                })
                .catch(e => {
                    alert("fail to extract data from clipboard")
                })
        }

        const onDragEnter = () => {
            setTempValue(props.value)
            update("Drop here")
        }

        const onDragLeave = () => {
            update(tempValue)
        }

        return (
            <>
                <textarea
                    className={'form-control'} value={props.value} onChange={e => update(e.target.value)}
                    onDoubleClick={
                        () => {
                            if (props.doubleClickToPaste) {
                                pasteFromClipboard()
                            } else if (props.doubleClickToCopy) {
                                ClipboardUtils.copy(props.value)
                            }
                        }
                    }
                    onDrop={ev => {
                        props.onDropCallback(ev)
                        const file = DragDropUtils.extractFileFromDragEvent(ev)
                        update("Dropped file: "+file?.name)
                    }}
                    onDragEnter={ev => {
                        if (props.droppable)
                            onDragEnter()
                    }}
                    onDragLeave={ev => {

                        if (props.droppable)
                            onDragLeave()
                    }}

                    rows={props.rows}
                />
                <div className={'silent-notify row'}>
                    {props.doubleClickToPaste ? <div className={'col-12'}><small>*double click to paste</small></div> : ''}
                    {props.doubleClickToCopy ? <div className={'col-12'}><small>*double click to copy</small></div> : ''}
                    {props.droppable ? <div className={'col-12'}><small>*allow dropping file here</small></div> : ''}
                </div>
            </>
        )
    }

    TextArea.defaultProps = {
        doubleClickToPaste: false,
        doubleClickToCopy: false,
        value: undefined,
        onDropCallback: (ev: ReactDragEvent) => {
            ev.preventDefault()
        },
        droppable: false,
        rows: 1,
    }
}