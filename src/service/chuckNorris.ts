import {IConfig} from "../interface";
import axios from "axios";
const config:IConfig = require("../constant/config.json");


class ChuckNorris{

    constructor(){
        axios.defaults.timeout= config.chuck_norris_service_Timeout;
    }

    public async getFact(){
        try{
            return (await axios.get(`${config.chuck_norris_url}?category=${config.chuck_norris_category_food}`)).data.value as string;
        } catch(err){
            return config.empty;
        }
    }
}

const service_chuckNorris = new ChuckNorris();
export default service_chuckNorris;