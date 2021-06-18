import {IFormatRequest, IResponse, IConfig} from "../interface"
import {util_validate} from "../util";
import {businessLogic_format} from "../businessLogic";
import {httpStatusCode} from "../constant";
const config:IConfig = require("../constant/config.json");

class Format{

    private readonly res:IResponse;
    constructor(){
        this.res = {statusCode:httpStatusCode.INTERNAL_SERVER_ERROR, data:config.server_error}
    }

    public async markdown(req:IFormatRequest){
        try{
            const err = await util_validate.format(req);
            if (err) {
                this.res.statusCode=httpStatusCode.BAD_REQUEST
                this.res.data =err
                return this.res;
            }
            const result = await businessLogic_format.markdown(req);
            this.res.statusCode=httpStatusCode.OK;
            this.res.data= result;
            return this.res;
        } catch(err){
            this.res.statusCode = httpStatusCode.INTERNAL_SERVER_ERROR;
            this.res.data = config.server_error;
            return this.res;
        }
    }
}

const controller_format = new Format();

export default controller_format;