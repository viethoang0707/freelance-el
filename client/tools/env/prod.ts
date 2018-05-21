import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  CLOUD_ENDPOINT: 'https://api.erp.vietinterview.com',
  CONFERENCE_ENDPOINT: 'https://meeting.erp.vietinterview.com',
  SOCKET_ENDPOINT: 'https://socket.erp.vietinterview.com',
  ENV: 'PROD',
  VERSION: '1.7.1'
};

export = ProdConfig;

