import express from "express";
import {IConfig} from "../interface";
const config:IConfig = require("../constant/config.json");
import provider from "./provider";
import {post} from "./route";

const app:express.Express = provider.app;

app.use(post.routes);

app.listen(config.port,()=> console.log(`server is running on port ${config.port}!`));

