# EXPIRY DATE PARSER

## Installation

Install [expiry-date-parser](https://www.npmjs.com/package/expiry-date-parser)

```
npm install --save expiry-date-parser
```

Or

```
yarn add expiry-date-parser
```

## Usage

```
const expiryDateParser = require("expiry-date-parser");

expiryDateParser("2050").then((dateString) => {
  console.log(dateString); // "2050-01-01"
});
```

## Input / Output

| Input      | Output     |
| ---------- | ---------- |
| 12         | 2023-12-01 |
| 21         | 2100-01-01 |
| 2050       | 2050-01-01 |
| 1250       | 2050-12-01 |
| 311250     | 2050-12-31 |
| 31122050   | 2050-12-31 |
| 06.2050    | 2050-06-01 |
| 12.50      | 2050-12-01 |
| 2050/02/10 | 2050-02-10 |
| 01.02.2050 | 2050-02-01 |
| 01.02.50   | 2050-02-01 |
| фев 50     | 2050-02-01 |
| Октябрь 50 | 2050-10-01 |
