import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.ts";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({});

  if (isDev) {
    mainWindow.load("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});
