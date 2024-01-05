// Import the Next.js server module
import next from "next"

// Set the PORT constant to the value of the PORT environment variable, or 3000 if the environment variable is not set
const PORT = Number(process.env.PORT) || 3000

// Initialize a Next.js application with the dev option set based on the NODE_ENV environment variable and the port option set to the PORT constant
export const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
    port: PORT,
})

// Get the request handler function from the Next.js application and export it
export const nextHandler = nextApp.getRequestHandler();