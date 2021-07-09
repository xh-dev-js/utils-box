import React from "react";


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
    const startRow = props.start / 10
    const maxRow = props.end / 10
    const range = Array.from({length: maxRow * 10}, (_, i) => [i])
    return (
        <>
            <table className={'table'}>
                <thead>
                <tr>
                    <th>N/A</th>
                    {Array.from({length: 10}, (_, i) => i).map(it => <th key={it} scope={'col'}>{it}</th>)}
                </tr>
                </thead>
                <tbody>
                {
                    Array.from({length: range.length / 10 + 1}, (_, i) => i).map(row => {
                        if (row < startRow) {
                            return (<></>)
                        } else {
                            return (
                                <tr key={row}>
                                    <th scope={'col'}>{row}</th>
                                    {Array.from({length: 10}, (_, i) => i).map(col =>
                                        row * 10 + col > props.end ?
                                            <td key={row * 10 + col}></td>
                                            :
                                            <td key={row * 10 + col} className={'grid-item'}>
                                                <CharBox code={row * 10 + col}/>
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