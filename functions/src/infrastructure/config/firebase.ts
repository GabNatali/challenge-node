import admin from "firebase-admin";
import {getFirestore} from "firebase-admin/firestore";

if (!admin.apps.length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        admin.initializeApp({
            credential: admin.credential.cert(
                JSON.parse(
                    Buffer.from(
                        process.env.FIREBASE_SERVICE_ACCOUNT as string,
                        "base64"
                    ).toString("utf-8")
                )
            ),
        });
    } else {
        admin.initializeApp();
    }
}

export const firestore = getFirestore();
