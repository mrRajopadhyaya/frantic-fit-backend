import bodyParser from "body-parser";
import express from "express";
import path from "path";
// import dotenv from "dotenv";
// dotenv.config();

require("dotenv").config();

class App {
  private app: express.Application;
  constructor(routes: any) {
    this.app = express();
    this.config();
    this.initializeRoutes(routes);
  }

  public listen = () => {
    this.app.listen(8080, () => {
      console.log(`Server is running on port 8080`);
    });
  };

  private config = (): void => {
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    bodyParser.text({ type: "text/plain" });
  };

  private initializeRoutes = (routes): void => {
    this.app.use((req, res, next) => {
      // doesn't send response just adjusts it
      res.header("Access-Control-Allow-Origin", "*"); // to give access to any origin
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" // to give access to all the headers provided
      );
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "PUT, POST, PATCH, DELETE, GET"
        ); // to give access to all the methods provided
        return res.status(200).json({});
      }
      next(); // so that other routes can take over
    });

    routes.forEach(route => {
      this.app.use("/", route.router);
      this.app.get("/test", (req, res) => {
        res.send("hello world");
      });
    });
  };
}

export default App;
