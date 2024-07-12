import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AllUserComponent } from './all-user/all-user.component';
import { ApprovalComponent } from './approval/approval.component';
import { CategoriesComponent } from './categories/categories.component';
import { ReportComponent } from './report/report.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin/profile', component: ProfileComponent },
    { path: 'admin/home', component: HomeComponent },
    {path:'admin/add-product',component:AddProductComponent},
    {path:'admin/all-users',component:AllUserComponent},
    {path:'admin/approval',component:ApprovalComponent},
    {path:'admin/categories',component:CategoriesComponent},
    {path:'admin/report',component:ReportComponent},
    {path:'admin/app',component:AppComponent},
    { path: '**', redirectTo: '/admin/login',pathMatch: 'full', }
];
