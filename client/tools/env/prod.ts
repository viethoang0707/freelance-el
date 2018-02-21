import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  CLOUD_ENDPOINT: 'https://api.erp.vietinterview.com',
  CONFERENCE_ENDPOINT: 'https://meeting.erp.vietinterview.com',
  ENV: 'PROD',
  VERSION: '1.0.0'
};

export = ProdConfig;

