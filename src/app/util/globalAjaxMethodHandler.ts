//========================== Internal Dependency Module Start =====================

import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

//============================ External dependency module for app =======================
import { environment } from '../../environments/environment';
//====================Service to show Response message ===============================


declare var jQuery: any;


@Injectable()
export class GlobalAjaxMethodHandler {

    base_path:any='';
    requestoptions:any;

    constructor(public http: Http, public router: Router) {
        this.base_path = environment.apiUrl;
    }
    //For Checking localstorage user, IF or NOT avaliable

    validateAllFields(formGroup: FormGroup) {

        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFields(control);
            }
        });
    }


    public getHeaderData() {

        let date: any = new Date();
        let utcTime = date.getTime() - date.getTimezoneOffset() * 60000;
        date = new Date(utcTime);
        let dateTime: any = date.toString().split('(')[1].substr(0, date.toString().split('(')[1].length - 1)
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("TIMEZONE", dateTime);
        return headers;
    }


    public getRequsetOptions(url: string): RequestOptions {

        let requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            headers: this.getHeaderData(),
            url: url
        })

        return requestoptions;
    }

    public postRequsetOptions(url: string, data: any): RequestOptions {

        let requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            headers: this.getHeaderData(),
            body: data,
            url: url
        })
        return requestoptions;
    }

    public deleteRequsetOptions(url: string): RequestOptions {

        let requestoptions = new RequestOptions({
            method: RequestMethod.Delete,
            headers: this.getHeaderData(),
            url: url
        })
        return requestoptions;
    }


    // =========================== post request for add data ============================

    public PostRequest(url: string, data: any) {

        return this.http.request(new Request(this.postRequsetOptions(url, data)))
            .map((res: Response) => {

                return this.responseHandler(res)

            })
            .catch((error: any) => {

                return this.erroHandler(error);
            });
    }


    public uploadImageRequest(url: string, data: any) {

        let date: any = new Date();
        let utcTime = date.getTime() - date.getTimezoneOffset() * 60000;
        date = new Date(utcTime);
        let dateTime: any = date.toString().split('(')[1].substr(0, date.toString().split('(')[1].length - 1)

        let headers = new Headers();
        headers.append("TIMEZONE", dateTime);


        this.requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: data,
            url: url
        })


        return this.http.request(new Request(this.requestoptions))
            .map((res: Response) => {


                if (res.json().code == 200 || res.json().code == 201 || res.json().code == 205) {
                    return [{ status: res.status, json: res.json() }];
                }
                else if (res.json().code == 204 || res.json().code == 304 || res.json().code == 401 || res.json().code == 404 || res.json().code == 406 || res.status == 401) {
                }
                else if (res.json().code == 400) {
                    this.router.navigateByUrl("/login");
                }
                else if (res.json().code == 500) {

                }
            })
            .catch((error: any) => {

                if (error.status == 0 || error.status === 500) {
                }
                else if (error.status === 400 || error.status === 409 || error.status === 406) {
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === 404) {
                }
                else if (error.status == 401) {
                }

            });
    }

    // ========================== get request for fetch data =============================

    public GetRequest(url: string): any {

        return this.http.request(new Request(this.getRequsetOptions(url)))
            .map((res: Response) => {


                return this.getResponseHandler(res);
            })
            .catch(error => {

                return this.getErrorHandler(error);
            });
    }


    customUrlParser(url) {
        let url2: string;
        if (url.includes("?")) { url2 = url + '&format=json'; }
        else { url2 = url + '?format=json' }
        return url2;
    }

    consoleFun(a?, b?, c?, d?, f?, g?): void {
        console.log(a, b, c, d, g);
    }

    loadScript(url) {
        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    loadCSS(url) {
        // Create link
        let link = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        link.type = 'text/css';

        let head = document.getElementsByTagName('head')[0];
        let links = head.getElementsByTagName('link');
        let style = head.getElementsByTagName('style')[0];
    }


    getUTCDate(selectedDate) {

        let utcTime = selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000;
        return new Date(utcTime);

    }


    getDemoUTCDate(demoDate) {

        let UTCDemoDate = demoDate;
        UTCDemoDate = new Date(UTCDemoDate.setHours(UTCDemoDate.getHours() - UTCDemoDate.getHours()));
        UTCDemoDate = new Date(UTCDemoDate.setMinutes(UTCDemoDate.getMinutes() - UTCDemoDate.getMinutes()));
        UTCDemoDate = new Date(UTCDemoDate.setSeconds(UTCDemoDate.getSeconds() - UTCDemoDate.getSeconds()));
        return UTCDemoDate;
    }


    responseHandler(res) {
            return [{ status: res.status, json: res.json() }];
    }

    erroHandler(error): any {
            return Observable.throw(new Error(error.status));
    }


    getResponseHandler(res) {
            return [{ status: res.status, json: res.json() }];
    }

    getErrorHandler(error): any {
            return Observable.throw(new Error(error.status));
    }


}

