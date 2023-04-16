import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fabmin.app',
  appName: 'Fabmin',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: 'http://10.0.2.2:5173',
    cleartext: true,
  }
};

export default config;
