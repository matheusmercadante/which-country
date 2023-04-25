import { get } from 'env-var';

export const serverConfig = {
  environment: get('NODE_ENV')
    .required()
    .asEnum(['development', 'production', 'test', 'local']),

  port: get('APP_PORT').required().asPortNumber(),
  prefix: get('API_PREFIX').required().asString(),
};

export const clientsConfig = {
  COUNTRY_API_URL: get('COUNTRY_API_URL').required().asString(),
};
