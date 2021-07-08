import React from 'react';
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
import {NavBarModule} from "./bootstrap/NavBarModule";
import {MyLocation} from "./components/MyLocation";
import {CompilerModule} from "./CompilerModule";

function App() {
    console.log("abc")
    const reader = new CompilerModule.Reader(CompilerModule.code)
    const scanner = new CompilerModule.Scanner(reader)
    while (true) {
        const token = scanner.nextToken()
        if (token === CompilerModule.Token.EOS_TOKEN) {
            break;
        }
        console.log("Read token: "+CompilerModule.tokenMap.get(token))
    }

    const tempDisabled = true
    const topContent = () => {
        if (tempDisabled) {
            return (<></>)
        } else {
            return (
                <>
                    <MyIp/>
                    <MyLocation/>
                </>
            )
        }
    }
    return (
        <>
            <NavBarModule.TopNavBar content={topContent()}/>
            <div className="App container">
                {/*<YouTubeUrlExtractor/>*/}
                <BootstrapCardModule.BootstrapCard componentName={"Base64 Decoder"} component={Base64Decoder()}/>
                {/*<Base64Decoder/>*/}
                <BootstrapCardModule.BootstrapCard componentName={"Base64 Encode"} component={Base64Encoder()}/>
                {/*<Base64Encoder/>*/}
                <BootstrapCardModule.BootstrapCard componentName={"MD5 Hasher"} component={Md5Hash()}/>
                {/*<Md5Hash/>*/}
                <BootstrapCardModule.BootstrapCard componentName={"Sha256 Hasher"} component={Sha256Hash()}/>
                {/*<Sha256Hash/>*/}
                <BootstrapCardModule.BootstrapCard componentName={"Sha1 Hasher"} component={Sha1Hash()}/>
                {/*<Sha1Hash/>*/}
                <BootstrapCardModule.BootstrapCard componentName={"URL Processor"} component={UrlProcessor()}/>
                {/*<UrlProcessor/>*/}
                <BootstrapCardModule.BootstrapCard componentName={"URL Encoder"} component={UrlEncoder()}/>
                {/*<UrlEncoder/>*/}
                <BootstrapCardModule.BootstrapCard componentName={"URL Decoder"} component={UrlDecoder()}/>
                {/*<UrlDecoder/>*/}
            </div>
        </>
    );
}

export default App;
