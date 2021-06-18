
import wrap from "word-wrap";
const align = require('wide-align')
import {IConfig } from "../interface";
const config:IConfig = require("../constant/config.json");

class StringOperation{
    constructor(){

    }

    public replaceWord(inputArr:Array<string>,wordToReplace:string,wordWithReplace:string){
        inputArr = inputArr.map(e=>{
            let regex = new RegExp(`(^|${config.allow_word_Character})${wordToReplace}(${config.allow_word_Character}|$)`);
            if (regex.test(e)) {
                return e.replace(wordToReplace,wordWithReplace)
            } return e;
        });

        return inputArr;
    }

    public matchWord(inputString:string, wordToMatch:string){
        let regex = new RegExp(`(^|\\s|${config.allow_word_Character})${wordToMatch}(\\s|${config.allow_word_Character}|$)`, "g");
        return regex.test(inputString);
    }

    public setWidth(inputString:string, width:number, spacing:string){
        return wrap(inputString,{cut:false,width:width, newline:spacing,indent:config.empty});
    }

    public setAlignment(inputString:string, width:number, spacing:string, alignment:string){
        return align[alignment](inputString.trim(),width-spacing.length);
    }

    public setItalic(word:string){
        return `_${word}_`
    }

    public setBold(word:string){
        return `**${word}**`
    }
}

const util_stringOperation = new StringOperation();

export default util_stringOperation;