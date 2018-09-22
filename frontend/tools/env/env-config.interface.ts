// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  AUTHEN_SERVER_URL?: string;
  CONFERENCE_ENDPOINT?: string;
  CONFERENCE_CLOUDID?:string;
  ENV?: string;
  VERSION?: string;
}
