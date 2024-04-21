import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";
import path from "path";
import { getAllFiles } from "./files";
import { uploadFile } from "./aws";
import { createClient } from "redis";
const publisher = createClient();
publisher.connect();
const subscriber = createClient();
subscriber.connect();
const app=express();
app.use(cors())
app.use(express.json())
app.post("/deploy",async (req,res)=>{
    const repoUrl=req.body.repoUrl;
    console.log(repoUrl);
    const id=generate();
    await simpleGit().clone(repoUrl,path.join(__dirname,`output/${id}`) )
    const files = getAllFiles(path.join(__dirname,`output/${id}`))
    files.forEach(async file=>{
        const filePath = file.replace(/\\/g, '/');
        await uploadFile(filePath.slice(__dirname.length+1),file);
    })
    console.log("upload successfully completed for the id: "+id);
    publisher.lPush("build-queue",id);
    publisher.hSet("status", id, "uploaded");

    res.json({
        id:id
    })
    
})

app.get("/status", async (req, res) => {
    const id = req.query.id;
    const response = await subscriber.hGet("status", id as string);
    res.json({
        status: response
    })
})
console.log("Running in port 3000");

app.listen(3000)
