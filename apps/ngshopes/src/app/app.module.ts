import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { UiModule } from '@e-commerce/ui';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    ProductListComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    UiModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'products', component: ProductListComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    ProductListComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
  ],
})
export class AppModule {}
