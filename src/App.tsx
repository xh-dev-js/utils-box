import React, {useState} from 'react';
import './App.css';
import UrlEncoder from "./components/UrlEncoder";
import UrlDecoder from "./components/UrlDecoder";
import UrlProcessor from "./components/UrlProcessor";
import Base64Encoder from "./components/Base64Encoder";
import Base64Decoder from "./components/Base64Decoder";
import Md5Hash from "./components/Md5Hash";
import Sha256Hash from "./components/Sha256Hash";
import Sha1Hash from "./components/Sha1Hash";
import {BootstrapCardModule} from "./bootstrap/BootstrapCardModule";
import MyIp from "./components/MyIp";
import {NumberRepresentations} from "./components/NumberFormater";
import {GeoIp} from "./components/GeoIp";
import {version} from '../package.json'
import {CodeTable} from "./components/CodeTable";
import {NavBarModule} from "./bootstrap/NavBarModule";
import {TimeTag} from "./components/TimeTag";
import {TimeTagSmallScreenModule} from "./components/TimeTagSmallScreenModule";
import {TimeConversion} from "./components/TimeConversion";
import {RatioConversion} from "./components/RatioConversion";

function App() {

    const tempDisabled = false
    const [width,setWidth] = useState(window.innerWidth)
    const [height,setHeight] = useState(window.innerHeight)

    window.addEventListener('resize', ()=>{
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const topContent = () => {

        if (tempDisabled) {
            return (<></>)
        } else {
            return (
                <>
                    <span className={'topBar-item topText'}>Version[&nbsp;<b>{version}</b>&nbsp;]</span>
                    <MyIp/>
                    <span className={'topBar-item topText'}>Screen size[{width},{height}]</span>
                </>
            )
        }
    }


    return (
        <>
            <NavBarModule.TopNavBar content={topContent()}/>
            <div className={'row'}>
                <div className={'col-md-12 col-lg-9 col-xl-9 col-xxl-10'}>
                    <div className="App container ">
                        <BootstrapCardModule.BootstrapCard componentName={'Ratio Conversion'} component={RatioConversion.UI()}/>
                        <BootstrapCardModule.BootstrapCard componentName={'Time Conversion'} component={TimeConversion.UI()}/>
                        <BootstrapCardModule.BootstrapCard extraClass={'TimeTagSmall'} componentName={"Time"} component={TimeTagSmallScreenModule.TimeTagSmallEmpty()}/>
                        <BootstrapCardModule.BootstrapCard componentName={"IP to country"} component={GeoIp()}/>
                        <BootstrapCardModule.BootstrapCard componentName={"Base64 Decoder"} component={Base64Decoder()}/>
                        <BootstrapCardModule.BootstrapCard componentName={"Base64 Encode"} component={Base64Encoder()}/>
                        <BootstrapCardModule.BootstrapCard componentName={"MD5 Hasher"} component={Md5Hash()}/>
                        <BootstrapCardModule.BootstrapCard componentName={"Sha256 Hasher"} component={Sha256Hash()}/>
                        <BootstrapCardModule.BootstrapCard componentName={"Sha1 Hasher"} component={Sha1Hash()}/>
                        <BootstrapCardModule.BootstrapCard componentName={"URL Processor"} component={UrlProcessor()}/>
                        <BootstrapCardModule.BootstrapCard componentName={"URL Encoder"} component={UrlEncoder()}/>
                        <BootstrapCardModule.BootstrapCard componentName={"URL Decoder"} component={UrlDecoder()}/>
                        <BootstrapCardModule.BootstrapCard componentName={"Number Representations"} component={NumberRepresentations()}/>
                        <BootstrapCardModule.BootstrapCard componentName={"Miscellaneous Symbols Table"} component={CodeTable({start: 9728, end: 9983})}/>
                        <BootstrapCardModule.BootstrapCard componentName={"Arrows Table"} component={CodeTable({start: 8592, end: 8703})}/>
                        <BootstrapCardModule.BootstrapCard componentName={"Currency Table"} component={CodeTable({start: 8352, end: 8399})}/>
                        <BootstrapCardModule.BootstrapCard componentName={"Greek Code Table"} component={CodeTable({start: 880, end: 1023})}/>
                        <BootstrapCardModule.BootstrapCard componentName={"Math Code Table"} component={CodeTable({start: 8704, end: 8959})}/>
                        <BootstrapCardModule.BootstrapCard componentName={"Ascii Code Table"} component={CodeTable({start: 0, end: 256})}/>
                    </div>
                </div>
                <div className={'col-md-12 col-lg-3 col-xl-3 col-xxl-2'}>
                    <div className={'SideBar'}>
                        <TimeTag/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
