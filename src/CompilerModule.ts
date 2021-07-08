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
//WoW`
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
        LEFT_BRACE_TOKEN, RIGHT_BRACE_TOKEN,MOD_TOKEN
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
        INIT, START
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

        nextToken(): Token {
            while (true) {
                switch (this.state) {
                    case CompilerModule.State.START:
                        const c = this.reader.nextChar()
                        switch (c) {
                            case ":":
                                return Token.COLON_TOKEN
                            case ";":
                                return Token.SEMICOLON_TOKEN
                            case "(":
                                return Token.LEFT_PARENT_TOKEN
                            case ")":
                                return Token.RIGHT_PARENT_TOKEN
                            case "{":
                                return Token.LEFT_BRACE_TOKEN
                            case "}":
                                return Token.RIGHT_BRACE_TOKEN
                            case "%":
                                return Token.MOD_TOKEN
                            case "":
                                return Token.EOS_TOKEN
                            case "\r":
                            case "\n":
                                this.currentLine++
                                break;
                            default:

                        }
                        break;
                }
            }
        }
    }

}