import React, {useEffect, useState} from "react";
import {TimeUtils} from "../helper/TimeUtils";
import {InputRowModule} from "../bootstrap/InputRow";

interface SideBarProps {
    extraClass:string,
}

export const TimeTag = (props: SideBarProps)=> {
    const [now, setNow] = useState(TimeUtils.now)

    // setInterval(()=>{
    //     setNow(TimeUtils.now)
    // },1000)

    useEffect(()=>{
        const id = setInterval(()=>{
            setNow(TimeUtils.now())
        }, 1000)

        return ()=>{
            clearInterval(id)
        }
    },[now])

    return (
        <div className={'TimeTagDiv '+ props.extraClass}>
            <InputRowModule.InputRow
                extraClassName={'TimeTag'}
                title={'Long'} doubleClickToCopy={true} isReadOnly={true}
                value={`${now.getTime()}`}
            ></InputRowModule.InputRow>
            <InputRowModule.InputRow
                extraClassName={'TimeTag'}
                title={'UTC'} doubleClickToCopy={true} isReadOnly={true}
                value={`${now.toLocaleDateString("en-US", {timeZone: 'GMT'})} - ${now.toLocaleTimeString("en-US", {timeZone: 'GMT'})}`}
            ></InputRowModule.InputRow>
            <InputRowModule.InputRow
                extraClassName={'TimeTag'}
                title={'HK'} doubleClickToCopy={true} isReadOnly={true}
                value={`${now.toLocaleDateString("en-US", {timeZone: 'Asia/Hong_kong'})} - ${now.toLocaleTimeString("en-US",{timeZone: 'Asia/Hong_kong'})}`}
            ></InputRowModule.InputRow>
            <InputRowModule.InputRow
                extraClassName={'TimeTag'}
                title={'TKY'} doubleClickToCopy={true} isReadOnly={true}
                value={`${now.toLocaleDateString("en-US", {timeZone: 'Asia/Tokyo'})} - ${now.toLocaleTimeString("en-US",{timeZone: 'Asia/Tokyo'})}`}
            ></InputRowModule.InputRow>
        </div>
    )
}

TimeTag.defaultProps = {
    extraClass: ''
}
