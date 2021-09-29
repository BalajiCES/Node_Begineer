// import { createServer } from "http";
import express from "express";
import { user } from "./users/index.js";

const app = express();

// createServer(function (request, response) {
//   if (request.url === "/users") {
//     user.getUsers(response);
//   } else if (request.url === "/users/age") {
//     user.getUsersByAge(response);
//   } else if (request.url === "/users/city") {
//     user.getUsersByPlace(response);
//   } else if (request.url === "/users/fullname") {
//     user.getUsersByName(response);
//   } else {
//     response.write("Home Url");
//     response.end();
//   }
// });

app.get("/", (req, res) => {
  res.write("Hello From server");
  res.end();
});

app.get("/users", (req, res) => {
  user.getUsers(res);
});

app.get("/users/:city", (req, res) => {
  const params = req.params;
  const { city = "" } = params;
  user.getCity(res, city);
});

const port = 3000;
app.listen(port, () => {
  console.log("Server started on port 3000");
});
