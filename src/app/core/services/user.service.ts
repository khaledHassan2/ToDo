import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly _HttpClient:HttpClient) { }

  postSignUP(data:any):Observable<any>{
    return this._HttpClient.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',data)
  }

  postSignIn(data:any):Observable<any>{
    return this._HttpClient.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',data)
  }
}
