# SFN-Date

**Simple Formatting Nice Date functions for Node.js.**

## Install

```sh
npm install sfn-date --save
```

## Example

```javascript
const date = require("sfn-date");

console.log("Y-m-d H:i:s", date("Y-m-d H:i:s"));
console.log("W M d Y H:i:s", date("W M d Y H:i:s"));
console.log("utc", date("utc"));
console.log("iso", date("iso"));

var count = 0;
console.log("\nStart ticking (Y-m-d H:i:s.ms)...");
date.tick("Y-m-d H:i:s.ms", text => {
    console.log(text);
    count += 1;
    if (count === 10)
        return false; // break tick.
}, 1000);
```

## API

- `date([format: string], [timestamp: number])` Gets formatted date-time 
    string.
    - `format` A format representation carries these symbols:
        - `Y` the year with 4 digits;
        - `y` the year with 2 digits;
        - `Month` the month in English;
        - `M` short-hand month;
        - `m` the month, 2 digits with leading zeros;
        - `n` the month, 1 or 2 digits without leading zeros;
        - `d` day of the month, 2 digits with leading zeros;
        - `G` 24-hour format of hours without leading zeros;
        - `g` 12-hour format of hours without leading zeros;
        - `H` 24-hour format hours with leading zeros;
        - `h` 12-hour format hours with leading zeros;
        - `i` minutes, with leading zeros;
        - `s` seconds, with leading zeros;
        - `ms` ms, with leading zeros;
        - `Week` day of the week in English;
        - `W` short-hand week;
        - `A` AM or PM;
        - `a` am or pm;
        - `gmt` GMT date-time string, case-insensitive;
        - `utc` same as `gmt`;
        - `iso` ISO8601 date-time string, case-insensitive.

        Default value is `Y-m-d H:i:s`.

    - `timestamp` Set a particular UNIX timestamp.

- `date.tick([format: string], callback, [interval: number])` Runs a function 
    continuously by a specific interval.
    - `format` is the format as `date()`.
    - `callback` A function called every time reaches the interval, accepts 
        one parameter, which is the current date-time string. If this function
        returns `false`, then break the time tick. 
    - `interval` Default value is `1000` ms.

### More Details About `date.tick()`

Unlike the original `setInterval()` function, this method won't start ticking 
immediately, it will firstly wait until the current time reaches a integral 
second, and runs the `callback` once before setting interval.