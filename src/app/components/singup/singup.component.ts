import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent {
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _UserActivation=inject(UserService);
  private readonly _Router=inject(Router);

  singupForm:FormGroup=this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,20}$/)]],
    age:[null,[Validators.required,Validators.min(20),Validators.max(100)]],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  })

  isLoding:boolean=false;
  isMsg!:string;

singUP():void{
 
  if (this.singupForm.valid) {
    
    this.isLoding=true;

    this._UserActivation.postSignUP(this.singupForm.value).subscribe({
      next:(res)=>{
        this.isLoding=false;
        this._Router.navigate(['/signin'])
        console.log(res);
        
  
      },
      error:(err:HttpErrorResponse)=>{
  
        this.isLoding=false;
        this.isMsg=err.error.msg
  
        console.log(err);
      }
    })
    
  }
  
  
}

}
