import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Http } from '@angular/http';
import { GlobalAjaxMethodHandler } from '../util/globalAjaxMethodHandler';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   signupForm:FormGroup;
   imageExtensionArray:any = [];
   imageSrc:any=[];
   filesFormData: any;

  constructor(public _fb:FormBuilder, public _GlobalAjaxMethodHandler:GlobalAjaxMethodHandler,private sanitizer: DomSanitizer){
  }

  ngOnInit() {
    this.formInitialization();
  }

  formInitialization() {

    this.signupForm = this._fb.group({
        name:[],
        email:[], 
        password:[],
        Files:[]
    })
  }

  submitSignupData() {

    let url = this._GlobalAjaxMethodHandler.base_path + 'signup';

    this._GlobalAjaxMethodHandler.PostRequest(url, this.signupForm.value)
            .subscribe(res =>{
                 if(res == undefined){} else {
                     console.log("response of signup",res)
                 }
            })
  }

  onFileChange(event) {

    let fileObject: any = {};
    if (event.target.files && event.target.files.length > 0) {
        this.setImageUrl(event);
    }
}

setImageUrl(event): any {

  let lengthOfFileArray = event.target.files.length;
  for (var i = 0; i < lengthOfFileArray; i++) {

      this.imageExtensionArray.push(event.target.files[i])
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);

      reader.onload = (imagesrc: any) => {

          let targetResult: any = {};
          targetResult.url = this.sanitizer.bypassSecurityTrustResourceUrl(imagesrc.target.result);
          this.imageSrc.push(targetResult);
      }
  }

  let count = 0;
  this.imageExtensionArray.forEach(eachImage => {
      if (eachImage.type == 'application/pdf' || eachImage.type == 'application/msword') {
          count = 1;
      }
  })

  if (count) {
      this.imageExtensionArray.reverse();
  }
  console.log(this.imageExtensionArray)

  this.setFormDataValue();
}

setFormDataValue() {

  const formData = new FormData();
  formData.append('name', this.signupForm.controls['name'].value, );
  formData.append('email', this.signupForm.controls['email'].value, );
  formData.append('password', this.signupForm.controls['password'].value, );

  if (this.imageExtensionArray.length) {
      for (let i = 0; i < this.imageExtensionArray.length; i++) {
          formData.append('Files[]', this.imageExtensionArray[i], this.imageExtensionArray[i].name);
      }
  }
  this.filesFormData = formData;
  console.log("filesFormData",this.filesFormData)
}


upload() {


  this.setFormDataValue();

  if (this.imageExtensionArray.length) {
    let url = this._GlobalAjaxMethodHandler.base_path + 'signup';
      this._GlobalAjaxMethodHandler.uploadImageRequest(url, this.filesFormData)
          .subscribe(res => {

              if (res == undefined) { } else {
              }
          },
              err => {
              })
  } else {
  }
}

}
