import { CanMatchFn } from '@angular/router';

export const loginGuard: CanMatchFn = (route, segments) => {
  const token : string | null = localStorage.getItem('auth-token');
  if(token) {
    return true;
  }
  return false;
};
