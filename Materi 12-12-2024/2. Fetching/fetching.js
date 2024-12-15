import fs from "fs";

// ? Mengambil data gempa dari API dan menyimpannya ke dalam file JSON

function saveDataToTXT(data) {
  fs.writeFile("./data.json", data, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File written successfully!");
    }
  });
}

async function getData() {
  const data = await fetch("https://api.zpi.my.id/v1/info/gempa");
  const json = await data.json();

  console.log(json);

  //save data
  saveDataToTXT(JSON.stringify(json.data, null, 2));
}

getData();
