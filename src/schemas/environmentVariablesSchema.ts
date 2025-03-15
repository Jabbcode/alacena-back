import * as Joi from '@hapi/joi';

export const environmentVariablesSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().default(3001).required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
