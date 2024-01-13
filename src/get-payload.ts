import dotenv from "dotenv"
import path from "path"
import type {InitOptions} from "payload/config"
import payload, { Payload } from "payload"
import nodemailer from "nodemailer"


// Configuring dotenv to load environment variables from .env file
dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
    }
})

// Creating a global variable to cache the payload
let cached = (global as any).payload;

// Checking if the payload is already cached
if (!cached) {
    // If not cached, initialize the payload object
    cached = (global as any).payload = {
        client: null,
        promise: null,
    };
}

// Defining the interface for the function arguments
interface Args {
    initOptions?: Partial<InitOptions>;
}

// Exporting the function that retrieves the payload client
export const getPayloadClient = async ({
    initOptions,
}: Args = {}): Promise<Payload> => {
    // Checking if PAYLOAD_SECRET environment variable is missing
    if (!process.env.PAYLOAD_SECRET) {
        throw new Error('PAYLOAD_SECRET is missing');
    }

    // Checking if the payload client is already cached
    if (cached.client) {
        return cached.client;
    }

    // Checking if the promise to initialize the payload is already cached
    if (!cached.promise) {
        // Initializing the payload with the provided secret and initOptions
        cached.promise = payload.init({
            email: {
                transport: transporter,
                fromAddress: "eyun@ericyun.dev",
                fromName: "FoxMarket",
            },
            secret: process.env.PAYLOAD_SECRET,
            local: initOptions?.express ? false : true,
            ...(initOptions || {}),
        });
    }

    try {
        // Waiting for the payload promise to resolve and assigning the client
        cached.client = await cached.promise;
    } catch (e: unknown) {
        // Resetting the promise and rethrowing the error
        cached.promise = null;
        throw e;
    }

    // Returning the cached payload client
    return cached.client;
};