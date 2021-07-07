import React from "react";
import {InputRowModule} from "../bootstrap/InputRow";
import {TextAreaModule} from "../bootstrap/TextArea";
import {StringUtils} from "pyyqww_t1/dist";


const {useState} = React

const UrlProcessor = () => {
    const [inputUrl, setInputUrl] = useState('')
    const [hasError, setHashError] = useState(true)
    const [protocol, setProtocol] = useState('')
    const [hostname, setHostName] = useState('')
    const [port, setPort] = useState('')
    const [pathname, setPathname] = useState('')
    const [search, setSearch] = useState('')
    const [hash, setHash] = useState('')
    const [host, setHost] = useState('')
    const componentName = "URL Processor"

    const checkIsUrl = (str: string) => {
        var pattern = new RegExp('^((http?:\\/\\/)?|(https?:\\/\\/)?)' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return pattern.test(str);
    }
    const process = (str: string) => {
        setInputUrl(str)
        if (checkIsUrl(str)) {
            setHashError(false)
            var parser = document.createElement('a');
            parser.href = str
            setProtocol(parser.protocol)
            setHostName(parser.hostname)
            setPort(parser.port)
            setPathname(parser.pathname)
            setSearch(parser.search)
            setHash(parser.hash)
            setHost(parser.host)
        } else {
            setHashError(true)
            setProtocol("")
            setHostName("")
            setPort("")
            setPathname("")
            setSearch("")
            setHash("")
            setHost("")
        }


    }

    return (
        <div className={StringUtils.nameStyleDelimiter(componentName)}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{componentName}</h5>
                    {/*<textarea className={'form-control'} value={inputUrl} onChange={e => process(e.target.value)}/>*/}
                    <TextAreaModule.TextArea value={inputUrl} updateCallback={text => process(text)}
                                             doubleClickToPaste={true}/>
                    <InputRowModule.InputRow title='Has Error?' value={hasError}/>
                    <InputRowModule.InputRow title='Protocol' value={protocol}/>
                    <InputRowModule.InputRow title='Hostname' value={hostname}/>
                    <InputRowModule.InputRow title='Port' value={port}/>
                    <InputRowModule.InputRow title='Pathname' value={pathname}/>
                    <InputRowModule.InputRow title='Search' value={search}/>
                    <InputRowModule.InputRow title='Hash' value={hash}/>
                    <InputRowModule.InputRow title='Host' value={host}/>
                    <InputRowModule.InputRow title='Server Url' value={`${protocol}${protocol==="" || host=== "" ? "" : "//"}${host}`}/>
                </div>
            </div>
        </div>
    )
}

export default UrlProcessor