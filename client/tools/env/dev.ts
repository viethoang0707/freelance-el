import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  CLOUD_ENDPOINT: 'http://localhost:5000',
  CONFERENCE_ENDPOINT: 'http://localhost:4444',
  SOCKET_ENDPOINT: 'http://localhost:3000',
  ENV: 'DEV',
  VERSION: '1.0.0'
};

export = DevConfig;

