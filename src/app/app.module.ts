import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

/* ------------------------- import internal dependencies ----------------- */
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

/* ------------------------- import lazy modules -------------------------- */
import { UserModule } from './lazyModules/user/user.module';

/* -------------------------- import service based module ----------------- */
import { GlobalAjaxMethodHandler } from './util/globalAjaxMethodHandler';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [GlobalAjaxMethodHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
