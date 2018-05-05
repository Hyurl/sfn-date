const date = require('./');

console.log("Y-m-d H:i:s =>", date("Y-m-d H:i:s"));
console.log("W M d Y H:i:s =>", date("W M d Y H:i:s"));
console.log("utc =>", date("utc"));
console.log("iso =>", date("iso"));

var count = 0;
console.log("\nStart ticking (Y-m-d H:i:s.ms)...");
date.tick("Y-m-d H:i:s.ms", text => {
    console.log(text);
    count += 1;
    if (count === 10)
        return false;
}, 1000);