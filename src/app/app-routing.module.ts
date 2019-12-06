import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {HotelComponent} from './hotel/hotel.component';
import {AdminComponent} from './admin/admin.component';
import {RegisterComponent} from './auth/register/register.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'hotel', component: HotelComponent,
  },
  {
    path: 'admin', component: AdminComponent,
  },
  {
    path: 'register', component: RegisterComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
