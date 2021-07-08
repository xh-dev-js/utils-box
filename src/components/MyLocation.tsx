import React, {useEffect, useState} from "react";
import {ClipboardUtils} from "pyyqww_t1/dist";


export module OpenWeatherApiResponse {

    export interface Coordinate {
        lon: number,
        lat: number,
    }

    export interface Weather {
        id: number,
        main: string,
        description: string,
        icon: string
    }

    export interface Main {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    }

    export interface Wind {
        speed: number,
        deg: number,
    }

    export interface Clouds {
        all: number
    }

    export interface Sys {
        type: number,
        id: number,
        message: number,
        country: string,
        sunrise: number,
        sunset: number,
    }

    export interface TempResp {
        coord: Coordinate,
        weather: Weather[],
        base: string,
        main: Main,
        visibility: number,
        wind: Wind,
        clouds: Clouds,
        dt: number,
        sys: Sys,
        timezone: number,
        id: number,
        name: string,
        cod: number

    }
}

const getWeather = async (lan: number, long: number) => {
    try{
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lan}&lon=${long}&units=metric&appid=96acc7d7969298497f07dd60dc2b0567`)
        // const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=22.26&lon=114.00&units=metric&appid=7096f227272b1da1e68dd357f9292f89`)
        const json = await resp.json()
        const finalJson = json as OpenWeatherApiResponse.TempResp
        return finalJson
    }
    catch (e){
        console.log(e)
        return null
    }

}

export const MyLocation = () => {
    const [label, setLabel] = useState('Fetching location')
    const [locationLan, setLocationLan] = useState(-1)
    const [locationLanLong, setLocationLong] = useState(-1)
    const [temp, setTemp] = useState("Fetching temperature")
    const [humidity, setHumidity] = useState("Fetching humidity")
    const [weather, setWeather] = useState("Fetching weather")
    const [location, setLocation] = useState("Fetching Location")


    function showPosition(position: GeolocationPosition): void {
        console.log(position)
        setLocationLan(position.coords.latitude)
        setLocationLong(position.coords.longitude)
        setLabel(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, error);
        } else {
            setLabel("Geolocation is not supported by this browser.");
        }
    }

    function error(err: GeolocationPositionError) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        getLocation()
    }, [])

    useEffect(() => {
        if (locationLan > 0 && locationLanLong > 0) {
            getWeather(locationLan, locationLanLong).then((finalJson) => {
                if(finalJson){
                    setTemp(finalJson.main.temp.toFixed(2))
                    setHumidity(finalJson.main.humidity.toFixed(2))
                    setWeather(finalJson.weather !== undefined && finalJson.weather !== null && finalJson.weather.length > 0 ? finalJson.weather[0].main : "N/A")
                    setLocation(finalJson.sys.country)
                }
            }).catch(e => console.log(e))
        }
    }, [label])


    const temps: TemperaturePropType[] = [{lan: 22.265382470091375, long: 113.99513011009766}]

    interface TemperaturePropType {
        lan: number
        long: number
    }

    const Temperature = (props: TemperaturePropType) => {
        const [lan, setLan] = useState(props.lan)
        const [long, setLong] = useState(props.long)
        const [name, setName] = useState('N/A')
        const [temp, setTemp] = useState('N/A')
        const [updateTime, setUpdateTime] = useState('N/A')

        const updateLocalizedTemperature = () => {
            getWeather(lan, long)
                .then(result => {
                    if(result){
                        setName(result.name)
                        setTemp(result.main.temp.toFixed(2))
                        setUpdateTime((new Date(result.dt*1000).toLocaleString()))
                    }
                })
                .catch(e => console.log(e))
        }
        useEffect(() => {
            intervalUpdate()
        }, [])

        const intervalUpdate=()=>{
            updateLocalizedTemperature()
            setInterval(()=>intervalUpdate(), 300*1000)
        }


        return (
            <>
                <span className={'topText'}>[{name}:&nbsp;{temp}&nbsp;&deg;C - {updateTime}]</span>
            </>
        )
    }
    return (
        <>
            <div className={'topBar-item'} title={'double click to copy'}
                 onDoubleClick={() => ClipboardUtils.copy(`${locationLan.toFixed(2)},${locationLanLong.toFixed(2)}`)}>
                <span className={'topText'}>Location: <b>{label}</b></span>
            </div>
            <div className={'topBar-item'} title={'double click to copy'}
                 onDoubleClick={() => ClipboardUtils.copy(temp)}>
                <span className={'topText'}>Temp: <b>{temp}</b>&nbsp;&deg;C</span>&nbsp;
                <span className={'topText'}>Humidity: <b>{humidity}</b> %</span>&nbsp;
                <span className={'topText'}>Weather: <b>{weather}</b></span>
            </div>
            <div className={'float-right topBar-item'}>
                {
                    temps.map((value, index) => {
                        return <Temperature key={index} lan={value.lan} long={value.long}/>
                    })
                }
            </div>
        </>
    )
}
