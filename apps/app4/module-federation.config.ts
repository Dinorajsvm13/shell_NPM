import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'app4',
  exposes: {
    './Module': 'apps/app4/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
