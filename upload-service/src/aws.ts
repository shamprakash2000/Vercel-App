import {S3} from "aws-sdk";
import fs from "fs";


const s3 = new S3({
    accessKeyId: "96e3920d66c26f9f8eb62936e2d83ee9",
    secretAccessKey: "1b75453e034ebd56af4de88070a1d8bd9e708b4afec5cdccac1a7277cd86722d",
    endpoint: "https://62e0a68f6c81bf4eea27ec2e871e51f4.r2.cloudflarestorage.com"
})

// fileName => output/12312/src/App.jsx
// filePath => /Users/HP/vercel/output/4ax4v/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
}