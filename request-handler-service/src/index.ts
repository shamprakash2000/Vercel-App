import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId: "96e3920d66c26f9f8eb62936e2d83ee9",
    secretAccessKey: "1b75453e034ebd56af4de88070a1d8bd9e708b4afec5cdccac1a7277cd86722d",
    endpoint: "https://62e0a68f6c81bf4eea27ec2e871e51f4.r2.cloudflarestorage.com"
})


const app = express();

app.get("/*", async (req, res) => {
    

    const host = req.hostname;

    const id = host.split(".")[0];
    console.log("id", id);
    
    const filePath = req.path;
    console.log("file path: ",filePath);
    

    
    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})
console.log("request-handler-service running in port 3001");

app.listen(3001); 