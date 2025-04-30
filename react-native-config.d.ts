declare module 'react-native-config' {
  export interface NativeConfig {
    OSS_ACCESS_KEY?: string;
    OSS_SECRET_KEY?: string;
    OSS_BUCKET?: string;
    PUB_API_APP_ID?: string;
    PUB_API_APP_SECRET?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
