export module CompilerModule {
    console.log("xyz")
    export const code =
        `
var a:int = 1;
var b:int = 2;
var c:bool = true;
if (c){
    print a;
}else{
    print b;
}
var i:int = 0;
while (i < 10){
    print i;
    i++;
}
`
//     export const code =
//         `/*
// Wescript
// */
// var a:int = 1;
// var b:int = 2;
// var c:bool = true;
// if (c){
//     print a;
// }else{
//     print b;
// }
// var i:int = 0;
// while (i < 10){
//     print i;
//     i++;
// }
// //WoW`

    export enum Token{
        EMPTY,
        EOS_TOKEN, COLON_TOKEN, SEMICOLON_TOKEN, LEFT_PARENT_TOKEN, RIGHT_PARENT_TOKEN,
        LEFT_BRACE_TOKEN, RIGHT_BRACE_TOKEN,MOD_TOKEN, VAR_TOKEN, INT_TOKEN,
        BOOL_TOKEN, IF_TOKEN, ELSE_TOKEN, WHILE_TOKEN, PRINT_TOKEN, IDENTIFIER_TOKEN,

        PLUS_TOKEN, PLUSPLUS_TOEKN, PLUSPLUSASSIGN_TOKEN
    }

    export interface TokenValue {
        type: Token
        value: string
    }

    export const tokenMap:Map<Token, String> = new Map([
        [Token.EMPTY,""],
        [Token.EOS_TOKEN,"EOS"],
        [Token.COLON_TOKEN,":"],
        [Token.SEMICOLON_TOKEN,";"],
        [Token.LEFT_PARENT_TOKEN,"["],
        [Token.RIGHT_PARENT_TOKEN,"]"],
        [Token.LEFT_BRACE_TOKEN,"{"],
        [Token.RIGHT_BRACE_TOKEN,"}"],
        [Token.MOD_TOKEN,"%"],

        [Token.VAR_TOKEN,"var"],
        [Token.INT_TOKEN,"int"],
        [Token.BOOL_TOKEN,"bool"],
        [Token.IF_TOKEN,"if"],
        [Token.ELSE_TOKEN,"else"],
        [Token.WHILE_TOKEN,"while"],
        [Token.PRINT_TOKEN,"print"],
        [Token.IDENTIFIER_TOKEN,"id"],
    ])

    export class Reader {
        data = ""
        curPos = 0
        dataLength = -1

        constructor(code: string) {
            this.data = code
            this.curPos = 0
            this.dataLength = code.length
        }

        nextChar(): string {
            if (this.curPos >= this.dataLength) {
                return ""
            }
            return this.data[this.curPos++]
        }

        retract(n?: number) {
            if (!n) {
                n = 1
            }

            this.curPos -= n

            if (this.curPos < 0) {
                this.curPos = 0
            }
        }

        retractOne() {
            this.retract(undefined)
        }
    }

    export enum State {
        INIT, START, IDENTIFIER
    }

    export class Scanner {
        currentToken: Token
        currentLine: number
        state: State = State.INIT

        constructor(private reader: Reader) {
            this.currentToken = Token.EMPTY
            this.currentLine = 0
            this.state = State.START
        }

        isWord = (c: string)=>(c >= "a" && c <= "z") || (c >= "A" && c <= "Z")
        nextToken(): TokenValue {
            let c
            let bufferStr: string =""
            while (true) {
                switch (this.state) {
                    case CompilerModule.State.START:
                        c = this.reader.nextChar()
                        if( this.isWord(c) ){
                            this.state = State.IDENTIFIER
                            bufferStr = c
                        }
                        else{
                            switch (c) {
                                case ":":
                                    return {type: Token.COLON_TOKEN, value: c}
                                case ";":
                                    return {type: Token.SEMICOLON_TOKEN, value: c}
                                case "(":
                                    return {type: Token.LEFT_PARENT_TOKEN, value: c}
                                case ")":
                                    return {type: Token.RIGHT_PARENT_TOKEN, value: c}
                                case "{":
                                    return {type: Token.LEFT_BRACE_TOKEN, value: c}
                                case "}":
                                    return {type: Token.RIGHT_BRACE_TOKEN, value: c}
                                case "%":
                                    return {type: Token.MOD_TOKEN, value: c}
                                case "":
                                    return {type: Token.EOS_TOKEN, value: c}
                                case "\r":
                                case "\n":
                                    this.currentLine++
                                    break;
                                default:
                            }
                        }
                        break;
                    case CompilerModule.State.IDENTIFIER:
                        c = this.reader.nextChar()
                        if( this.isWord(c)){
                            bufferStr+=c
                        } else{
                            this.reader.retractOne()
                            this.state = State.START
                            switch (bufferStr){
                                case "var":
                                    return {type: Token.VAR_TOKEN, value: bufferStr}
                                case "true":
                                case "false":
                                    return {type: Token.BOOL_TOKEN, value: bufferStr}
                                case "if":
                                    return {type: Token.IF_TOKEN, value: bufferStr}
                                case "else":
                                    return {type: Token.ELSE_TOKEN, value: bufferStr}
                                case "while":
                                    return {type: Token.WHILE_TOKEN, value: bufferStr}
                                case "print":
                                    return {type: Token.PRINT_TOKEN, value: bufferStr}
                                default:
                                    return {type: Token.IDENTIFIER_TOKEN, value: bufferStr}
                            }
                        }
                        break;
                }
            }
        }
    }

}