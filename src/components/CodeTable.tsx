import React, {useState} from "react";


interface CharBoxPropType {
    code: number
}

export const CharBox = (props: CharBoxPropType) => {
    function toSymbol(code: number) {
        const codeStr = '&#' + code + ';'
        const tempElement = document.createElement('div')
        tempElement.innerHTML = `${codeStr}`
        return tempElement.textContent
    }

    const symbol = toSymbol(props.code)
    return (
        <span>{symbol}
            &#20;[{props.code}]
        </span>
    )

}

export interface CodeTableProps {
    start: number
    end: number
}

export const CodeTable = (props: CodeTableProps) => {
    const [base,setBase] = useState(10)
    window.addEventListener('resize', ()=>{
        const width = window.innerWidth
        // setBase(5)
        // if(width < 500){
        //     setBase(3)
        // } else if(width < 700) {
        //     setBase(4)
        // } else if(width < 800) {
        //     setBase(5)
        // } else {
        //     setBase(10)
        // }
    })

    console.log(base)
    const startRow = props.start / base
    const maxRow = props.end / base
    const range = Array.from({length: maxRow * base}, (_, i) => [i])
    return (
        <>
            <table className={'table'}>
                <thead>
                <tr>
                    <th>N/A</th>
                    {Array.from({length: base}, (_, i) => i).map(it => <th key={it} scope={'col'}>{it}</th>)}
                </tr>
                </thead>
                <tbody>
                {
                    Array.from({length: range.length / base + 1}, (_, i) => i).map(row => {
                        if (row < startRow) {
                            return (<></>)
                        } else {
                            return (
                                <tr key={row}>
                                    <th scope={'col'}>{row}</th>
                                    {Array.from({length: base}, (_, i) => i).map(col =>
                                        row * 10 + col > props.end ?
                                            <td key={row * base + col}></td>
                                            :
                                            <td key={row * base + col} className={'grid-item'}>
                                                <CharBox code={row * base + col}/>
                                            </td>
                                    )}
                                </tr>
                            )
                        }
                    })
                }

                </tbody>
            </table>
        </>
    )
}