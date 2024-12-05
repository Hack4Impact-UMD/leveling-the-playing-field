import { credential } from "firebase-admin";
import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const existingApps = getApps();
const adminApp =
  existingApps.length === 0
    ? initializeApp(
        {
          credential: credential.cert(
            process.env.FIREBASE_ADMIN_CREDENTIALS_FILEPATH as string
          ),
          projectId: "lpf-checkout-system",
        },
        "adminApp"
      )
    : existingApps[0];

export const adminAuth = getAuth(adminApp);