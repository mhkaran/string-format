export interface IErroMessage{
    mandatory:IMandatory
    type:IType
    wrong_value:IWrongValue
}

interface IMandatory{
    input: string
    alignment: string
    spacing: string
}

interface IType{
    bold:string
    chuck_Norris:string
    italic:string
    replace:string
    width:string
}

interface IWrongValue{
    alignment:string
}