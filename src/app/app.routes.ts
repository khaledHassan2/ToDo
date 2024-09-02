import { authGuard } from './core/gurdes/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SinginComponent } from './components/singin/singin.component';
import { SingupComponent } from './components/singup/singup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { signupGuard } from './core/gurdes/signup.guard';

export const routes: Routes = [
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:'home',canActivate:[authGuard], component:HomeComponent},
    {path:'signin',canActivate:[signupGuard], component:SinginComponent},
    {path:'signup',canActivate:[signupGuard], component:SingupComponent},
    {path:'**', component:NotfoundComponent},
];
