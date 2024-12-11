import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ShellComponent } from './shared/shell/shell.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CardModule } from 'primeng/card';
//toolbar
import { ToolbarModule } from 'primeng/toolbar';
// button
import { ButtonModule } from 'primeng/button';
//splitbutton
import { SplitButtonModule } from 'primeng/splitbutton';
//table module
import { TableModule } from 'primeng/table';
import { provideHttpClient } from '@angular/common/http';
import { CategoriesService } from '@e-commerce/products';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  SplitButtonModule,
  TableModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    ShellComponent,
    SidebarComponent,
    DasboardComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    ...UX_MODULE,
  ],
  providers: [provideHttpClient(), CategoriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
