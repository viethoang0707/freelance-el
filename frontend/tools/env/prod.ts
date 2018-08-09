import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  AUTHEN_SERVER_URL: 'https://api.nissan.vietinterview.com',
  CONFERENCE_ENDPOINT: 'https://meeting.vietinterview.com',
  CONFERENCE_CLOUDID: 'MEETING',
  ENV: 'PROD',
  VERSION: '2.0.1'
};

export = ProdConfig;

