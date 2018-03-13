import Joi from 'joi';

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
      .allow(['development', 'production', 'test', 'provision'])
      .default('development'),
    SERVER_PORT: Joi.number()
      .default(4000),
    SENDGRID_API_KEY: Joi.string()
      .default(''),
  }).unknown()
    .required();
  
const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    sendgrid_key: envVars.SENDGRID_API_KEY
};

export default config;