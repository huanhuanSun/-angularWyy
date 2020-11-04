import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { HomeResolveService } from './home-resolve.service';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path:'home',
    component:HomeComponent,
    data:{title:'发现'},
    //路由守卫
    resolve:{
      homeData:HomeResolveService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[HomeResolveService]
})
export class HomeRoutingModule { }
