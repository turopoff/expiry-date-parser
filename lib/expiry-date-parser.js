"use strict";

const moment = require("moment");
const parseFormat = require("moment-parseformat");

const { $arrayLastItem, $number } = require("./utils.js");

const currentYear = new Date().getFullYear();
const prevYear = currentYear - 1;

const months = [
  "янв",
  "фев",
  "мар",
  "апр",
  "ма[яйи]",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "но[йя]",
  "дек",
];

module.exports = {
  parseExpiryDateAsync: async (value) => {
    return new Promise((resolve) => {
      tryParseDate(value, (res) => {
        if (new Date(res).getFullYear() < prevYear) res = null;
        resolve(res);
      });
    });
  },
};

function tryParseDate(date_df, callback) {
  date_df = `${date_df || ""}`;

  const timeIndex = date_df.indexOf("T");

  if (timeIndex >= 0) {
    date_df = date_df.substring(0, timeIndex);
  }

  if (date_df.length < 2) return callback(null);
  date_df = date_df.toLocaleLowerCase();
  const _number = date_df.replace(/[-,.-/- ]/g, "");
  const string = date_df.replace(/[.,-/- ]/g, "-");

  if ($number(_number)) {
    if (_number.length == 8) {
      if (date_df.length == 10) {
        const format = parseFormat(date_df);
        const resMoment = moment(date_df, format, "ru");
        const res = resMoment.isValid() ? resMoment.format("YYYY-MM-DD") : null;
        return callback(res);
      } else {
        const resMoment = moment(date_df, "DDMMYYYY", "ru");
        const res = resMoment.isValid() ? resMoment.format("YYYY-MM-DD") : null;
        return callback(res);
      }
    } else if (_number.length == 4) {
      const mm = _number.substring(0, 2);
      if (mm > 12 && _number >= prevYear) {
        return callback(`${_number}-01-01`);
      } else {
        const yy = _number.substring(2, 4);
        const y = "20" + yy;
        if (y >= prevYear) return callback(`${y}-${mm}-01`);
      }
    } else if (_number.length == 2) {
      if (_number <= 12) {
        return callback(`${currentYear}-${_number}-01`);
      } else {
        const cy = `${currentYear}`.substring(2, 4);
        const y = _number > cy ? "20" + _number : _number + "00";
        if (y >= currentYear) return callback(`${y}-01-01`);
      }
    } else {
      const array = string.split("-");
      const lastNumber = $number($arrayLastItem(array));
      if (array.length == 3 && lastNumber >= 22) {
        const resMoment = moment(date_df, "DDMMYY", "ru");
        const res = resMoment.isValid() ? resMoment.format("YYYY-MM-DD") : null;
        return callback(res);
      } else if (array.length == 2 && lastNumber >= 2022) {
        const resMoment = moment(date_df, "MMYYYY", "ru");
        const res = resMoment.isValid() ? resMoment.format("YYYY-MM-DD") : null;
        return callback(res);
      } else if (_number.length == 6) {
        const d = _number.substring(0, 2);
        const m = _number.substring(2, 4);
        const y = _number.substring(4, 6);
        if (`20${y}` >= currentYear && m <= 12 && d <= 31) {
          const resMoment = moment(date_df, "DDMMYY", "ru");
          let res = null;
          if (resMoment.isValid()) res = resMoment.format("YYYY-MM-DD");
          return callback(res);
        }
      }
    }
  } else if (monthRegex.test(string)) {
    const dt = monthToNumber(string);
    if (dt) {
      return tryParseDate(dt, callback);
    }
  }

  callback(null);
}

function monthToNumber(str) {
  let res = null;

  for (let index = 0; index < months.length; index++) {
    const month = months[index];
    const regex = new RegExp(`^${month}`, "i");
    if (regex.test(str)) {
      const array = str.split("-");

      res = array
        .map((item) => {
          if (regex.test(item)) return `${index + 1}`.padStart(2, "0");
          return item;
        })
        .filter((x) => $number(x))
        .join("-");
      break;
    }
  }

  return res;
}
