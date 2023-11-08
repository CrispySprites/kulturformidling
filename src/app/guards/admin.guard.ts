import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const role: string | null = localStorage.getItem('user-role')
  if(role === 'Admin') {
    return true
  }else {
    return false
  }
};
