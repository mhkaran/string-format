import express from "express";
import cors from "cors";

class Provider{
    public app:express.Express;

    constructor(){
        this.app= express();
        this.app.use(cors());

        this.app.use(express.json({limit:'5mb'}));
        this.app.use(express.urlencoded({extended:true, limit:'5mb', parameterLimit:50}));
    }
}

const provider = new Provider();

export default provider;