import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof localStorage !='undefined') {

    if (localStorage.getItem('token')) {
      return true;
    }
    else{
      return false;
    }
    
  }
  else{
    return false;
  }
};
