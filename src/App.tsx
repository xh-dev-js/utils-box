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

function App() {
    fetch("https://asia-east2-ultra-acre-276608.cloudfunctions.net/ipChecker")
        .then(text=>console.log(text))
        .catch(e=>console.log(e))

    return (
        <div className="App container">
            {/*<YouTubeUrlExtractor/>*/}
            <Base64Decoder/>
            <Base64Encoder/>
            <Md5Hash/>
            <Sha256Hash/>
            <Sha1Hash/>
            <UrlProcessor/>
            <UrlEncoder/>
            <UrlDecoder/>
        </div>
    );
}

export default App;
