import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'signup',
        pathMatch:'full'

    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: 'user',
        loadChildren: 'app/lazyModules/user/user.module#UserModule',
    }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
