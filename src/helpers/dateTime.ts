import { toInteger } from "lodash";

const unixTimeToFullDate = (_timestamp: string) => {
    const timestamp = toInteger(_timestamp);

    const dateObj = new Date(timestamp)

    // year as 4 digits (YYYY)
    const year = dateObj.getFullYear();

    // month as 2 digits (MM)
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);

    // date as 2 digits (DD)
    const date = ("0" + dateObj.getDate()).slice(-2);

    // date string in DD-MM-YYYY format
    const fullDate = `${date}.${month}.${year}`;

    return fullDate;
}

export default unixTimeToFullDate;