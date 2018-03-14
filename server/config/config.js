import Joi from 'joi';
import dotenv from 'dotenv'
dotenv.config();

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    SERVER_PORT: Joi.number()
        .default(4000),
    EMAIL_AGENT: Joi.string()
        .allow(['mailgun', 'sendgrid'])
        .default('sendgrid'),
    SENDGRID_URL: Joi.string()
        .default(''),
	SENDGRID_API_KEY: Joi.string()
		.default(''),
	MAILGUN_URL: Joi.string()
		.default(''),
	MAILGUN_API_KEY: Joi.string()
		.default(''),
}).unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

if (!envVars.SENDGRID_API_KEY) {
    throw new Error('No sendgrid api key found');
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    agent: envVars.EMAIL_AGENT,
	sendgrid_url: envVars.SENDGRID_URL,
    sendgrid_key: envVars.SENDGRID_API_KEY,
	mailgun_url: envVars.MAILGUN_URL,
	mailgun_key: envVars.MAILGUN_API_KEY
 };

export default config;
