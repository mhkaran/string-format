import {IFormatRule} from "./IFormatRule";

export interface IFormatRequest{
    formatRuleType?:string;
    input?:string;
    formatRule?:IFormatRule;
}

