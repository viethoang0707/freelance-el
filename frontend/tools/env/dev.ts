import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  API_ENDPOINT: 'http://localhost:5000',
  CONFERENCE_ENDPOINT: 'http://localhost:4444',
  ENV: 'DEV',
  VERSION: '2.0.1'
};

export = DevConfig;

