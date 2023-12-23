require("dotenv").config();

const app = require("express")();
app.use(express.json()) 

app.get("/", (req, res) => {
  res.send("TJO - Logging Server");
});

app.use("/", require("./loggingRouter.js"));

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
  console.log(listener.address())
});

module.exports = app;