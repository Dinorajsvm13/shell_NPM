import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'app3',
  exposes: {
    './Module': 'apps/app3/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
