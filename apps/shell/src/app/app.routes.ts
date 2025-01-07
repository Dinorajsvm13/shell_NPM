import { loadRemoteModule } from '@nx/angular/mf';
import { environment } from '../environments/environment';
import { Route } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { NotFoundComponent } from './not-found/not-found.component';

export function getDynamicRoutes(): Route[] {
  const dynamicRoutes = environment.remotes.map((config) => ({
    path: config.routerPath,
    data: { conf: { ...config, baseUrl: environment.baseUrl } },
    loadChildren: () =>
      loadRemoteModule(config.projectName, './Module').then(
        (m) => m.MackAngularModule
      ),
  }));

  const staticRoutes: Route[] = [
    {
      path: '',
      component: ContainerComponent,
      children: [...dynamicRoutes],
    },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404', pathMatch: 'full' },
  ];
  const routes = [...staticRoutes];
  return routes;
}
