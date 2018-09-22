import { EnvConfig } from './env-config.interface';

const BaseConfig: EnvConfig = {
  AUTHEN_SERVER_URL: 'http://localhost:5000',
  CONFERENCE_ENDPOINT: 'http://localhost:4444',
  CONFERENCE_CLOUDID: 'MEETING'
};

export = BaseConfig;

