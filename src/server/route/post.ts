import express from "express";
import {controller_format} from "../../controller";

class Post{
    public routes:express.Router;
    constructor(){
        this.routes = express.Router();

        this.routes.post('/format',async(req:express.Request,res:express.Response,_next:express.NextFunction)=>{
            const resData = await controller_format.markdown(req.body);
            res.status(resData.statusCode).json(resData.data);
        });
    }
}

const post = new Post()
export default post;