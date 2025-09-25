import { Storage } from "@google-cloud/storage";

export const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials:{
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g,"\n")

    }
})

export const bucket = storage.bucket(process.env.GCP_BUCKET_NAME!);