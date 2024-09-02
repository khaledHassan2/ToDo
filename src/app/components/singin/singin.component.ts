
import { Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './singin.component.html',
  styleUrl: './singin.component.scss'
})
export class SinginComponent {

  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _UserService=inject(UserService);
  private readonly _Router=inject(Router);

  isLoding:boolean=false;
  isMsg !: string;


  signinForm:FormGroup=this._FormBuilder.group({

       email:[null,[Validators.required,Validators.email]],
       password:[null,[Validators.required,Validators.pattern(/^\w{6,20}$/)]],
  })

  singin():void{

    if (this.signinForm.valid) {

      this.isLoding=true;

      this._UserService.postSignIn(this.signinForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          localStorage.setItem('token',res.token);
          this._Router.navigate(['/home']);
          this.isLoding=false;
  
        },
        error:(err)=>{
          console.log(err);
          this.isLoding=false;
          this.isMsg=err.error.msg
        }
      })
      
    }
  }

 

}
