import Joi from "joi";

export const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  MONGO_URI: Joi.string().uri().required(),
  ACCESS_TOKEN_SECRET: Joi.string().min(32).required(),
  REFRESH_TOKEN_SECRET: Joi.string().min(32).required(),
  CLIENT_URL: Joi.string().uri().required(),
  FRONTEND_URL: Joi.string().uri().required(),
  COOKIE_SECURE: Joi.boolean().default(false),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().default(587),
  EMAIL_USER: Joi.string().email().required(),
  EMAIL_PASS: Joi.string().required(),
}).unknown(true);

export function validateEnv(env) {
  const { error, value } = envSchema.validate(env, { abortEarly: false });
  if (error) {
    throw new Error(
      "❌ Invalid .env configuration:\n" +
      error.details.map(d => `- ${d.message}`).join("\n")
    );
  }
  return value;
}