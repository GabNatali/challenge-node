import * as functions from "firebase-functions";
import {createApp} from "./app";

export const api = functions.https.onRequest((req, res) => {
    const app = createApp();
    return app(req, res);
});
