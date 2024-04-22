"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = require("aws-sdk");
const s3 = new aws_sdk_1.S3({
    accessKeyId: "96e3920d66c26f9f8eb62936e2d83ee9",
    secretAccessKey: "1b75453e034ebd56af4de88070a1d8bd9e708b4afec5cdccac1a7277cd86722d",
    endpoint: "https://62e0a68f6c81bf4eea27ec2e871e51f4.r2.cloudflarestorage.com"
});
const app = (0, express_1.default)();
app.get("/*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const host = req.hostname;
    // //const id = host.split(".")[0];
    // const id=req.params.id;
    // // const id="xudji";
    // const makePart="/"+id;
    // const parts = req.path.split(makePart);
    // console.log("parts",parts);
    // console.log("pathhhhh",req.path);
    // const filePathTemp = parts[0]===''?parts[1]:parts[0];
    // const filePath=filePathTemp;
    // console.log("re path", filePath);
    // console.log("id",id);
    // const id=req.params.id;
    // console.log("id", id);
    // const filePathCheck = req.path;
    // let filePath="";
    // if(filePathCheck.includes("/"+id)){
    //     filePath=filePathCheck.substring(6);
    // }
    // else{
    //     filePath=filePathCheck;
    // }
    // console.log("file path", filePath);
    const host = req.hostname;
    const id = host.split(".")[0];
    console.log("id", id);
    const filePath = req.path;
    console.log("file path: ", filePath);
    const contents = yield s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript";
    res.set("Content-Type", type);
    res.send(contents.Body);
}));
console.log("request-handler-service running in port 3001");
app.listen(3001);
