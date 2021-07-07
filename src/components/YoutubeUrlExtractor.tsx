import React, {useEffect} from "react";
import {TextAreaModule} from "../bootstrap/TextArea";
import {InputRowModule} from "../bootstrap/InputRow";
import {YoutubeDownloaderUtils} from "../helper/YoutubeDownloaderUtils";
import {StringUtils} from "pyyqww_t1/dist";
const {useState} = React

const YouTubeUrlExtractor = () => {
    const [inputUrl, setInputUrl] = useState('')
    const [videoId, setVideoId] = useState('')

    useEffect(() => {
        const id = YoutubeDownloaderUtils.getVideoId(inputUrl)
        if (id !== null) {
            setVideoId(id)
        }
    }, [inputUrl])
    let componentName = "YouTube Url Extractor"
    let i = InputRowModule.InputRow

    return (
        <div className={StringUtils.nameStyleDelimiter(componentName)}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{componentName}</h5>
                    {/*<CheckBoxModule.CheckBox title="decodeURI" generalName="decode_uri_radio" checked={useDecodeUri} setChecked={(_)=>setUseDecodeUri(true)}/>*/}
                    {/*<CheckBoxModule.CheckBox title="decodeURIComponent" generalName="decode_uri_component_radio" checked={!useDecodeUri} setChecked={(_)=>setUseDecodeUri(false)}/>*/}
                    {/*<TextAreaModule.TextArea value={inputValue} updateCallback={text=>decoding(text)} doubleClickToPaste={true}/>*/}
                    {/*<TextAreaModule.TextArea value={decodedValue} updateCallback={text=>{decoding(text)}} doubleClickToCopy={true}/>*/}
                    <TextAreaModule.TextArea value={inputUrl} updateCallback={text => setInputUrl(text)}
                                             doubleClickToPaste={true}/>
                    <InputRowModule.InputRow title={`Video ID`} value={videoId}/>
                </div>
            </div>
        </div>
    )
}

export default YouTubeUrlExtractor