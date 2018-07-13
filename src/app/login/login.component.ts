import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Http } from '@angular/http';
import { GlobalAjaxMethodHandler } from '../util/globalAjaxMethodHandler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(public _fb:FormBuilder, public _GlobalAjaxMethodHandler:GlobalAjaxMethodHandler){
  }

  ngOnInit() {
    this.formInitialization();
  }

  formInitialization() {

    this.loginForm = this._fb.group({
        email:[], 
        password:[]
    })
  }

  login() {

    let url = this._GlobalAjaxMethodHandler.base_path + 'login';
    this._GlobalAjaxMethodHandler.PostRequest(url, this.loginForm.value)
            .subscribe(res =>{
                 if(res == undefined){} else {
                     console.log("response of login",res)
                 }
            })
  }
}
