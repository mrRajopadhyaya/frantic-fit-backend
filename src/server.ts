import App from "./app";
import UserRoute from "./Routes/User";

class Server {
  private app;
  constructor() {
    this.app = new App([new UserRoute()]);
    this.app.listen();
  }
}

new Server();
