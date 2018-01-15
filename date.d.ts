/**
 * Gets formatted date-time string.
 * 
 * @param format Could carry these symbols:
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
 */
declare function date(format?: string, timestamp?: number): string;

declare namespace date {
    /**
     * @param interval Default is `1000`ms.
     */
    function tick(cb: (dateStr: string) => void, interval?: number): void;
    /**
     * @param interval Default is `1000`ms.
     */
    function tick(format: string, cb: (dateStr: string) => void, interval?: number): void;
}

export = date;