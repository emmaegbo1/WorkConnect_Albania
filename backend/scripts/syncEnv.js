// backend/scripts/syncEnv.js
import fs from "fs";
import { envSchema } from "../src/config/validateEnv.js"; // export schema from validateEnv.js

// Generate example file from Joi schema
const exampleLines = Object.keys(envSchema.describe().keys).map((key) => {
  return `${key}=`;
});

const content = exampleLines.join("\n") + "\n";

fs.writeFileSync(".env.example", content);
console.log("✅ .env.example updated from Joi schema");