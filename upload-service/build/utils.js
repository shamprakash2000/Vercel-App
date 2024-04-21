"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const MAX_LEN = 5;
function generate() {
    let ans = "";
    const subset = "1234567890qwertyuiopasdfghjklzxcvbnm";
    for (let index = 0; index < MAX_LEN; index++) {
        ans += subset[Math.floor(Math.random() * subset.length)];
    }
    return ans;
}
exports.generate = generate;
