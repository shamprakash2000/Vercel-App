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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const aws_1 = require("./aws");
const utils_1 = require("./utils");
const subscriber = (0, redis_1.createClient)();
subscriber.connect();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const response = yield subscriber.brPop((0, redis_1.commandOptions)({ isolated: true }), 'build-queue', 0);
            //@ts-ignore
            const id = response.element;
            console.log("id:", id);
            yield (0, aws_1.downloadS3Folder)(`output/${id}`);
            console.log("download completed for the id:", id);
            yield (0, utils_1.buildProject)(id);
            console.log("build complete for id:", id);
            yield (0, aws_1.copyFinalDist)(id);
            console.log("build file upload to s3 completed");
        }
    });
}
console.log("deploy-service started");
main();
