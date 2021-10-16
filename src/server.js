const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 3020;

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
