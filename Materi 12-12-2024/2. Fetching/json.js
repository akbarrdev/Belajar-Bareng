import fs from "fs";

// membaca data dari data.json
const json = fs.readFile("./data.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const jsonData = JSON.parse(data);
  return jsonData;
});

// json = javascript object notation

console.log(json);
