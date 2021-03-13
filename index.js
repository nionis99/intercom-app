import { AppRegistry } from "react-native";
import * as Sentry from "@sentry/react-native";
import App from "./App";
import Config from "react-native-config";
import { name as appName } from "./app.json";

Sentry.init({
  dsn: Config.SENTRY_DSN,
});

AppRegistry.registerComponent(appName, () => App);
