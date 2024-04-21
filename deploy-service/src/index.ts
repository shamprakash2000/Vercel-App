import {createClient, commandOptions} from "redis";
import { copyFinalDist, downloadS3Folder } from "./aws";
import { buildProject } from "./utils";
const subscriber = createClient();
subscriber.connect();
const publisher = createClient();
publisher.connect();

async function main() {
    while(true){
        const response = await subscriber.brPop(
            commandOptions({isolated:true}),
            'build-queue',0
        );
        //@ts-ignore
        const id=response.element;
        console.log("id:",id);
        await downloadS3Folder(`output/${id}`);
        console.log("download completed for the id:", id);
        await buildProject(id);
        console.log("build complete for id:",id);
        await copyFinalDist(id);
        console.log("build file upload to s3 completed");
        publisher.hSet("status", id, "deployed")
        
    }
}
console.log("deploy-service started");

main()