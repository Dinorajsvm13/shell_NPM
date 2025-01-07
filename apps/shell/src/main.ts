import { setRemoteDefinitions } from '@nx/angular/mf';
import { environment } from './environments/environment';

const remoteDefinitions = Object.fromEntries(
  environment.remotes.map((config: any) => [
    config.projectName,
    `${environment.baseUrl}${config.portOrPath}`
  ])
);
setRemoteDefinitions(remoteDefinitions);
import('./bootstrap').catch((err) => console.error(err));
