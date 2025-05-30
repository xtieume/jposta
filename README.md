# jpostal
[![npm version](https://badge.fury.io/js/jpostal.svg)](https://badge.fury.io/js/jpostal)
[![npm downloads](https://img.shields.io/npm/dm/jpostal.svg)](https://www.npmjs.com/package/jpostal)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

This package is a fork of [jposta](https://github.com/nickichi/jposta) with additional functionality. The main difference is the addition of the `getPrefs()` function to get a list of Japanese prefectures.

Modern library for Japanese postal code to address.
日本語の補足は最下部にあります。



## Features
⚡ Simple usage with compatibility for modern frameworks <br />
⚡ ES6 / Promise based / Typescript ready <br />
⚡ No dependencies <br />
⚡ Self-hosted & dynamic import (no implicit API calls)

## Installation
```bash
$ npm install jpostal
```

## Usage
```javascript
import { getAddress, getPrefs } from 'jpostal';

// pass zip code as string
const address = await getAddress('1000001');
console.log(address);
// { pref: "東京都", prefNum: 13, city: "千代田区", area: "千代田" }

// also you can pass zip code with hyphen
const address2 = await getAddress('100-0003');
console.log(address2);
// { pref: "東京都", prefNum: 13, city: "千代田区", area: "皇居外苑" }

// get list of prefectures
const prefs = getPrefs();
console.log(prefs);
// ["北海道", "青森県", "岩手県", ...]
```

## Dynamic Import (Browser)
jposta needs to host the data file on your project.

```bash
# Your project build
$ npm run build

> vite-react-jposta@0.0.0 build
> tsc && vite build

vite v5.2.13 building for production...
✓ 136 modules transformed.
dist/index.html                         0.46 kB │ gzip:  0.30 kB
dist/assets/react-CHdo91hT.svg          4.13 kB │ gzip:  2.05 kB
dist/assets/index-DiwrgTda.css          1.39 kB │ gzip:  0.72 kB
dist/assets/z11-nic1O4vt-B_L_y_VH.js    2.29 kB │ gzip:  0.95 kB
dist/assets/z96-Br2qdTMP-DG7Gpu3V.js   80.14 kB │ gzip: 27.45 kB
...(many files)
dist/assets/z50-BWUSdQBW-BJcxw7Xg.js   87.66 kB │ gzip: 29.14 kB
dist/assets/z60-34YubQWJ-DwuyaedM.js  101.50 kB │ gzip: 29.97 kB
dist/assets/index-D0vWSNxA.js         152.48 kB │ gzip: 49.62 kB
✓ built in 2.16s
```

...and then you can import the data file dynamically.

```javascript
const result1 = await getAddress('1000001');
// then import the data file named like z10.js
const result2 = await getAddress('2100002');
// then import the data file named like z21.js
const result3 = await getAddress('1000003');
// then return data without additional import
```

## Compatibility
ESM & CJS compatible.
ESM is recommended.

## Configuration
WIP

## Data Update
To update the postal code data from Japan Post:

1. Update the CSV file:
```bash
npm run update-csv
```
This script will download the latest CSV file from Japan Post.

2. Parse the CSV data into JSON files:
```bash
npm run parse-csv
```
This script will:
- Create the `zips` directory if it doesn't exist
- Remove old files in the `zips` directory
- Parse the CSV file into JSON files
- Copy the generated JSON files to the `lib/zips` directory

The generated JSON files will have the following format:
- `z10.json`, `z11.json`, etc. (corresponding to the first two digits of the postal code)
- Each JSON file contains address data corresponding to the postal codes

## Samples
- Vite + React + jposta ([source code](https://github.com/nickichi/vite-react-jposta)):
https://nickichi.github.io/vite-react-jposta/
- Next.js(webpack) + jposta ([source code](https://github.com/nickichi/nextjs-jposta)): https://nickichi.github.io/nextjs-jposta/
- Node.js + Express + jposta: https://github.com/nickichi/node-express-jposta

## License
see [LICENSE](./LICENSE)

---

## 補足
- 郵便番号と住所は、[日本郵便株式会社の郵便番号データ](https://www.post.japanpost.jp/zipcode/download.html)を利用しています
- このライブラリは self-hosted な郵便番号検索を提供するために作成されました。外部APIを使用せず、バックエンドも不要です。ただし、ホストするアセットが100増えます。
- クライアントサイドでのDynamic Importを利用したくない場合は、サーバサイド（Node.js）に導入することで、簡単に郵便番号APIを構築できます(Samples参照)。