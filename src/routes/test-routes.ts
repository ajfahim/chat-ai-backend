import { Router } from "express";

//Protected API
const testRoute = Router();
testRoute.get("/", (req, res) => {
  res.send("hello world");
});

export default testRoute;
