import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ShellComponent } from './shared/shell/shell.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';

// Routes
import { appRoutes } from './app.routes';

// Services
import { MessageService } from 'primeng/api';
import { CategoriesService } from '@e-commerce/products';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  SplitButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    ...UX_MODULE,
  ],
  providers: [provideHttpClient(), CategoriesService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
