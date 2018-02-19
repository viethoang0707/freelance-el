import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  CLOUD_ENDPOINT: 'http://54.177.51.246:5000',
  CONFERENCE_ENDPOINT: 'http://meeting.erp.vietinterview.com:6666',
  ENV: 'PROD',
  VERSION: '1.0.0'
};

export = ProdConfig;

