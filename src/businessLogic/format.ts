import {IFormatRequest, IFormatRule, IConfig, IFormatLine } from "../interface";
const format_Rule = require("../constant/formatRule.json");
const config:IConfig = require("../constant/config.json");
import {service_chuckNorris} from "../service";
import {util_stringOperation} from "../util";

class Format{

    private rule:IFormatRule;
    private output:Array<IFormatLine>;

    constructor(){
        this.rule = format_Rule[config.default];
        this.output = new Array<IFormatLine>();
    }
    public async markdown(req:IFormatRequest){

        const inputArr = req.input!.split(config.new_line);

        this.output = new Array<IFormatLine>(inputArr.length);

        await this.setRule(req.formatRuleType!,req.formatRule);

        await Promise.all(inputArr.map(async (line,index) => {
            return this.lineFormatting(line, index);
        }));

        this.output.sort((a,b)=>{
            return a.index-b.index
        });

        const formattedString = this.output.map(element=>{
            return element.line;
        }).join(config.empty).slice(0,(this.rule!.spacing.length)*-1);

        return formattedString;
    }

    private async setRule(formatRuleType:string,formatRule:IFormatRule|undefined){

        if (format_Rule[formatRuleType]) {
            this.rule = format_Rule[formatRuleType];
        } else
        if (formatRule) {
            this.rule = formatRule!;
        } else {
            this.rule = format_Rule[config.default]
        }
    }

    private async lineFormatting(line:string, index:number){

        line = await this.chuckNorris(line);

        line = await this.bold(line);

        line = await this.italic(line);

        line = await this.replace(line);

        const lineArr = await this.width(line);

        const lineStr = await this.alignment(lineArr);

        this.output!.push({line:lineStr, index:index});
    }

    private async alignment(lineArr:Array<string>){

        let lineStr='';

        lineArr.forEach(lines=>{
            lines.split(this.rule!.spacing).forEach(line=>{
                lineStr += `${util_stringOperation.setAlignment(line, this.rule!.width, this.rule!.spacing, this.rule!.alignment)}${this.rule!.spacing}`;
            })
        })
        return lineStr;
    }

    private async width(line:string){

        return line.split(config.new_line).map(e=>{
            return util_stringOperation.setWidth(e,this.rule!.width,this.rule!.spacing);
        });
    }

    private async italic(line:string){
        let lineArr= line.split(config.blank_seprated);
        this.rule!.italic.forEach(word=>{
            lineArr = util_stringOperation.replaceWord(lineArr, word, util_stringOperation.setItalic(word));
        })
        return lineArr.join(config.blank_seprated);
    }

    private async bold(line:string){
        let lineArr= line.split(config.blank_seprated);
        this.rule!.bold.forEach(word=>{
            lineArr = util_stringOperation.replaceWord(lineArr, word, util_stringOperation.setBold(word));
        })
        return lineArr.join(config.blank_seprated);
    }

    private async replace(line:string){
        let lineArr= line.split(config.blank_seprated);
        this.rule!.replace.forEach(word=>{
            const wordWithReplace = word.split(config.comma_seprated)[1]
            const wordToReplace = word.split(config.comma_seprated)[0]
            lineArr = util_stringOperation.replaceWord(lineArr,wordToReplace,wordWithReplace);
        });

        return lineArr.join(config.blank_seprated);
    }

    private async chuckNorris(line:string){

        for(let word of this.rule!.chuck_Norris){
            if (util_stringOperation.matchWord(line,word)) {
                line = `${line}${config.new_line}${await service_chuckNorris.getFact()}`
            }
            break;
        }
        return line;
    }
}


const businessLogic_format = new Format();

export default businessLogic_format;