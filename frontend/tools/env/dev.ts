import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  AUTHEN_SERVER_URL: 'http://localhost:5000',
  CONFERENCE_ENDPOINT: 'http://localhost:4444',
  CONFERENCE_CLOUDID: 'MEETING',
  ENV: 'DEV',
  VERSION: '2.0.1'
};

export = DevConfig;

