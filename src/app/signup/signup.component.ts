import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Http } from '@angular/http';
import { GlobalAjaxMethodHandler } from '../util/globalAjaxMethodHandler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   signupForm:FormGroup;

  constructor(public _fb:FormBuilder, public _GlobalAjaxMethodHandler:GlobalAjaxMethodHandler){
  }

  ngOnInit() {
    this.formInitialization();
  }

  formInitialization() {

    this.signupForm = this._fb.group({
        name:[],
        email:[], 
        password:[]
    })
  }

  submitSignupData() {

    let url = this._GlobalAjaxMethodHandler.base_path + 'signup';
    debugger

    this._GlobalAjaxMethodHandler.PostRequest(url, this.signupForm.value)
            .subscribe(res =>{
                 if(res == undefined){} else {
                     console.log("response of signup",res)
                 }
            })
  }
}