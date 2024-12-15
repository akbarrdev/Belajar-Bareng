// ? Function and Print to console

function log() {
  const text = "Hello World";
  console.log(text);
}

function logError() {
  const text = "Hello World";
  console.error(text);
}

function logWarning() {
  const text = "Hello World";
  console.warn(text);
}

function logTable() {
  const data = {
    name: "John",
    age: 30,
    city: "New York",
  };
  console.table(data);
}


// Call function
log();
logError();
logWarning();
logTable();