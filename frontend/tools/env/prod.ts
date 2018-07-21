import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  API_ENDPOINT: 'https://api.srv01.vietinterview.com',
  CONFERENCE_ENDPOINT: 'https://meeting.vietinterview.com',
  ENV: 'PROD',
  VERSION: '2.0.1'
};

export = ProdConfig;

