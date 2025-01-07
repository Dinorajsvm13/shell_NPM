import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'app1',
  exposes: {
    './Module': 'apps/app1/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
