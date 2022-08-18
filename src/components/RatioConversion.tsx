import React, {useEffect, useState} from "react";
import {TextAreaModule} from "../bootstrap/TextArea";
import {InputRowModule} from "../bootstrap/InputRow";
import {InputEditableRowModule} from "../bootstrap/InputEditableRow";


export module RatioConversion {
    export const UI = () => {
        const [v, setV] = useState('50')
        const [m, setM] = useState('100')
        const [value, setValue] = useState('')
        const [out, setOut] = useState('')
        const [current, setCurrent] = useState(0.0)
        const [max, setMax] = useState(100.0)

        useEffect(()=>{
            try{
                const split = value.split("/")
                if(split.length !== 2){
                    setOut('Size not correct')
                    return
                }
                const current = parseFloat(split[0])
                const max = parseFloat(split[1])
                setOut((current/max*100).toFixed(2)+" %")

                setCurrent(current)
                setMax(max)
            }
            catch(e){
                console.error(e)
                setOut('Error')
            }
        },[value])

        useEffect(()=>{
            setValue(`${v}/${m}`)
        },[v,m])

        const addOrMinus = (s: string, v: number, max: string):string => {
            const ss = parseInt(s)
            const mmax = parseInt(max)
            if(ss+v > mmax){
                return max
            } else if (ss+v < 0){
                return "0"
            } else {
                return (ss+v).toString()
            }
        }
        return (
            <>
                <InputEditableRowModule.InputEditableRow title={"Current Value"} value={v} setValue={e=>setV(e)}
                                                         doubleClickToCopy={true}
                />
                <button onClick={_=>setV(addOrMinus(v, -10, m))}>Minus 10</button>
                <button onClick={_=>setV(addOrMinus(v, -5, m))}>Minus 5</button>
                <button onClick={_=>setV(addOrMinus(v, -1, m))}>Minus 1</button>
                <button onClick={_=>setV(addOrMinus(v, 1, m))}>Add 1</button>
                <button onClick={_=>setV(addOrMinus(v, 5, m))}>Add 5</button>
                <button onClick={_=>setV(addOrMinus(v, 10, m))}>Add 10</button>
                <InputEditableRowModule.InputEditableRow title={"Max Value"} value={m} setValue={e=>setM(e)}
                                                         doubleClickToCopy={true}
                />
                <InputEditableRowModule.InputEditableRow title={"Formula [{current value} / {max value} * 100%]"} value={value} setValue={e=>setValue(e)}
                                                         doubleClickToCopy={true}
                />
                <script src="https://gist.github.com/xh-dev/fcff155c8dfbfcf4f9b2bf3cf32462e4.js"></script>
                <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar"
                         style={{width: `${(current / max * 100).toFixed(2)}%`}}
                         aria-valuenow={current} aria-valuemin={0} aria-valuemax={max}
                    />
                </div>{out} %
            </>
        )
    }
}
