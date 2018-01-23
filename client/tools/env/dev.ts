import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  CLOUD_ENDPOINT: 'http://localhost:5000',
  ENV: 'DEV',
  VERSION: '1.0.0'
};

export = DevConfig;

