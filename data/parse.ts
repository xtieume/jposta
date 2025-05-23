import * as fs from "node:fs";
import { parse } from "csv-parse/sync";

const OUTPUT_DIR = "../lib/zips";

const parseCsv = () => {
	const file = fs.readFileSync("./utf_ken_all.csv", "utf8");
	const records = parse(file, {
		skip_empty_lines: true,
	}) as string[][];

	records.sort((a, b) => {
		if (a[2] < b[2]) return -1;
		if (a[2] > b[2]) return 1;
		return 0;
	});

	// Ensure output directory exists
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	let count = 0;
	let chunk: {
		key: string;
		data: {
			[key: string]: [number, string, string];
		};
	} = {
		key: "",
		data: {},
	};

	for (const record of records) {
		// https://www.post.japanpost.jp/zipcode/dl/utf-readme.html
		const code = record[0];
		const zip = record[2];
		const pref = record[6];
		const city = record[7];
		const rawArea = record[8].replace(/（.+）/g, "");

		const area =
			rawArea.includes("以下に掲載がない場合") ||
			rawArea.includes("番地がくる場合")
				? ""
				: rawArea;

		const prefNum = Number.parseInt(code.slice(0, 2));
		if (!pref) {
			console.error(
				`pref not found prefNum:${prefNum} record:${JSON.stringify(record)}`,
			);
			continue;
		}

		const chunkKey = zip.slice(0, 2);
		if (chunk.key === "") {
			chunk = {
				key: chunkKey,
				data: {},
			};
		}
		if (chunk.key !== chunkKey) {
			fs.writeFileSync(`${OUTPUT_DIR}/z${chunk.key}.json`, JSON.stringify(chunk.data));
			chunk.key = "";
		}

		// count records for confirmation
		count++;

		if (chunk.data[zip]) {
			// skip duplicate (use the first one)
			continue;
		}

		chunk.data[zip] = [prefNum, city, area];
	}

	// write the last chunk
	if (chunk.key !== "") {
		fs.writeFileSync(`${OUTPUT_DIR}/z${chunk.key}.json`, JSON.stringify(chunk.data));
	}

	console.log(`processed ${count} records.`);
};

parseCsv();
