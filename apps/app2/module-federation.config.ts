import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'app2',
  exposes: {
    './Module': 'apps/app2/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
