const app = require("./app");
const initModel = require("./models/initModel");
const db = require("./utils/database");
require('dotenv').config();

const PORT = process.env.PORT || 5000;

db.authenticate()
  .then(() => {
    console.log("[+] Connection DB successfully.");
  })
  .catch((error) => {
    console.error("[!] Unable to connect to the database:", error);
  });

db.sync({ force: false })
  .then(() => {
    console.log("[+] Database synchronized.");
  })
  .catch((error) => {
    console.error("[!] Unable to synchronize the database:", error);
  });

initModel();

app.listen(PORT, () => {
  console.log(`[+] Server is running on port ${PORT}.`);
});
