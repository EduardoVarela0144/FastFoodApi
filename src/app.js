require('dotenv').config()
const app = require("./server");
const port = app.get("port");
app.listen(port, () => {
  console.log(`Welcome to ulsafoods api listening on port ${port}`);
});

