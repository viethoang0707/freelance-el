import { EnvConfig } from './env-config.interface';

const TestConfig: EnvConfig = {
  CLOUD_ENDPOINT: 'https://api.test.vietinterview.com',
  CONFERENCE_ENDPOINT: 'https://meeting.test.vietinterview.com',
  SOCKET_ENDPOINT: 'https://socket.test.vietinterview.com',
  ENV: 'TEST',
  VERSION: '1.0.0'
};

export = TestConfig;

