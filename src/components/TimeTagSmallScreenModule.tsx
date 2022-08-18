import React, {useEffect, useState} from "react";
import {TimeUtils} from "../helper/TimeUtils";


export module TimeTagSmallScreenModule {
    type SideBarProps = {
        extraClass:string;
    }

    export const TimeTagSmallEmpty = ()=> {
        return TimeTagSmall({extraClass: ''})
    }
    export const TimeTagSmall = (props: SideBarProps)=> {
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
            <div className={'TimeTagSmall row '+ props.extraClass}>
                <label>
                    UTC: {`${now.toLocaleDateString("en-US", {timeZone: 'GMT'})} - ${now.toLocaleTimeString("en-US", {timeZone: 'GMT'})}`}
                </label>
                <label >
                    UTC: {`${now.toLocaleDateString("en-US", {timeZone: 'Asia/Hong_kong'})} - ${now.toLocaleTimeString("en-US",{timeZone: 'Asia/Hong_kong'})}`}
                </label>
                <label>
                    UTC: {`${now.toLocaleDateString("en-US", {timeZone: 'Asia/Tokyo'})} - ${now.toLocaleTimeString("en-US",{timeZone: 'Asia/Tokyo'})}`}
                </label>
            </div>
        )
    }

    TimeTagSmall.defaultProps = {
        extraClass: ''
    }

}
