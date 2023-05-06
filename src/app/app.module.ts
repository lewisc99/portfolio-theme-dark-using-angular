import {  NgModule } from '@angular/core';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';
import { MainComponent } from './main-component/main-component';


@NgModule({
  declarations: [
    AppComponent,
    PortfolioDetailComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

 export function HttpTranslateLoader(http: HttpClient)
 {
      return new TranslateHttpLoader(http);
 }