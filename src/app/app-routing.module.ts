import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';
import { MainComponent } from './main-component/main-component';

const routes: Routes = [
  {path:"", component: MainComponent},
  {path:":id", component: PortfolioDetailComponent},
  {path:"**", redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
