import {IFormatRequest,IFormatRule,IErroMessage,IConfig} from "../interface";
const errorMessage:IErroMessage = require("../constant/errorMessage.json");
import {alignment} from "../constant";
const config:IConfig = require("../constant/config.json");

class Validation {

    constructor(){}

    public async format(req:IFormatRequest):Promise<string>{

        if (!(req.input) || !(req.input.trim())) {
            return errorMessage.mandatory.input;
        }
        if (req.formatRule) {
            return await this.cstomUserFormationRule(req.formatRule)
        }

        return config.empty;
    }

    private async cstomUserFormationRule(formatRule:IFormatRule){
        if (!(formatRule.alignment)) {
            return errorMessage.mandatory.alignment;
        }
        if (!Object.values(alignment).includes(formatRule.alignment)) {
            return errorMessage.wrong_value.alignment;
        }
        if (!(Array.isArray(formatRule.bold))) {
            return errorMessage.type.bold;
        }
        if (!(Array.isArray(formatRule.chuck_Norris))) {
            return errorMessage.type.chuck_Norris;
        }
        if (!(Array.isArray(formatRule.italic))) {
            return errorMessage.type.italic;
        }
        if (!(Array.isArray(formatRule.replace))) {
            return errorMessage.type.replace;
        }
        if (!formatRule.spacing) {
            return errorMessage.mandatory.spacing;
        }
        if (isNaN(Number(formatRule.width))) {
            return errorMessage.type.width
        }

        return config.empty;
    }
}

const util_validate = new Validation();

export default util_validate;