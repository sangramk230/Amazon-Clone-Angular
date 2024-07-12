import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CategorywiseComponent } from './categorywise/categorywise.component';

export const routes: Routes = [
    {path:'user/login',component:LoginComponent},
    {path:'user/profile',component:ProfileComponent},
    {path:'user/home',component:HomeComponent},
    {path:'user/my-order',component:MyOrderComponent},
    {path:'user/cart',component:CartComponent},
    {path:'user/check', component:CheckOutComponent},
    {path:'user/category',component:CategorywiseComponent},
    { path: '', redirectTo: 'user/home', pathMatch: 'full' }
];