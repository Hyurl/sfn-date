/**
 * Gets formatted date-time string.
 * 
 * @param  {string}  [format]  Could carry these symbols:
 *  - `Y` the year with 4 digits;
 *  - `y` the year with 2 digits;
 *  - `Month` the month in English;
 *  - `M` short-hand month;
 *  - `m` the month, 2 digits with leading zeros;
 *  - `n` the month, 1 or 2 digits without leading zeros;
 *  - `d` day of the month, 2 digits with leading zeros;
 *  - `G` 24-hour format of hours without leading zeros;
 *  - `g` 12-hour format of hours without leading zeros;
 *  - `H` 24-hour format hours with leading zeros;
 *  - `h` 12-hour format hours with leading zeros;
 *  - `i` minutes, with leading zeros;
 *  - `s` seconds, with leading zeros;
 *  - `ms` ms, with leading zeros;
 *  - `Week` day of the week in English;
 *  - `W` short-hand week;
 *  - `A` AM or PM;
 *  - `a` am or pm;
 *  - `gmt` GMT date-time string, case-insensitive;
 *  - `utc` same as `gmt`;
 *  - `iso` ISO8601 date-time string, case-insensitive.
 *  
 *  Default format is `Y-m-d H:i:s`.
 * 
 * @param  {number}  [timestamp]  Set a specific UNIX timestamp.
 * 
 * @return {string} 
 */
function date(format, timestamp) {
    if (typeof format === "number") {
        timestamp = format;
        format = null;
    }

    var format = format || 'Y-m-d H:i:s',
        _date = new Date();

    if (timestamp) _date.setTime(timestamp);

    var year = [
        _date.getFullYear(),
        _date.getFullYear().toString().substr(2)
    ];

    var month = [
        ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
        ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    ];

    var date = _date.getDate() >= 10 ? _date.getDate() : '0' + _date.getDate(),
        hours = _date.getHours() >= 10 ? _date.getHours() : '0' + _date.getHours(),
        minutes = _date.getMinutes() >= 10 ? _date.getMinutes() : '0' + _date.getMinutes(),
        seconds = _date.getSeconds() >= 10 ? _date.getSeconds() : '0' + _date.getSeconds(),
        ms = _date.getMilliseconds(),
        weekday = [
            ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.']
        ],
        apm = hours <= 12 ? ['AM', 'am'] : ['PM', 'pm'];

    if (ms < 10) {
        ms = "00" + ms;
    } else if (ms < 100) {
        ms = "0" + ms;
    }

    format = format.replace(/\bgmt|utc\b/i, _date.toUTCString())
        .replace(/\biso\b/i, _date.toISOString())
        .replace(/\bY\b/, year[0])
        .replace(/\by\b/, year[1])
        .replace(/\bMonth\b/, month[0][_date.getMonth()])
        .replace(/\bM\b/, month[1][_date.getMonth()])
        .replace(/\bm\b/, month[2][_date.getMonth()])
        .replace(/\bn\b/, month[3][_date.getMonth()])
        .replace(/\bd\b/, date)
        .replace(/\bG\b/, _date.getHours())
        .replace(/\bg\b/, _date.getHours() > 12 ? _date.getHours() - 12 : _date.getHours())
        .replace(/\bH\b/, hours)
        .replace(/\bh\b/, hours > 12 ? hours - 12 : hours)
        .replace(/\bi\b/, minutes)
        .replace(/\bms\b/, ms)
        .replace(/\bs\b/, seconds)
        .replace(/\bWeek\b/g, weekday[0][_date.getDay()])
        .replace(/\bW\b/, weekday[1][_date.getDay()])
        .replace(/\bA\b/, apm[0])
        .replace(/\ba\b/, apm[1]);

    return format;
}

/**
 * Runs a function continuously by a specific interval.
 * 
 * @param {string} [format] Same format as `date()`.
 * 
 * @param {Function} callback A function called every time reaches the 
 *  interval, accepts one parameter, which is the current date-time string. If
 *  this function returns `false`, then break the time tick.
 * 
 * @param {number} [interval] Default is `1000`ms.
 */
date.tick = function tick(format, callback, interval) {
    if (typeof format == "function") {
        interval = callback || 1000;
        callback = format;
        format = null;
    } else {
        interval = interval || 1000;
    }

    var start = 999 - (new Date).getMilliseconds(),
        timer = null,
        tick = function () {
            var result = callback(date(format));
            if (result === false)
                clearInterval(timer);
        };

    setTimeout(function () {
        timer = setInterval(tick, interval);
        tick();
    }, start);
}

if (typeof module === 'object' && module.exports) {
    module.exports = date; // CommonJS
} else if (typeof define === 'function') {
    // AMD/CMD
    define(function (require, exports, module) {
        module.exports = date;
    });
}