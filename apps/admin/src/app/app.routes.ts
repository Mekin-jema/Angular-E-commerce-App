import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DasboardComponent,
      },
    ],
  },
];
