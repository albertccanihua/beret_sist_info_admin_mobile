import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserService } from './services/user/user.service.service';

export const auth2Guard: CanActivateChildFn = (childRoute, state) => {
  const userService = inject(UserService);
  const router = inject(Router)

  const token = localStorage.getItem('token')

  if (token == '' || token == null || token == undefined || token == 'undefined') {
    router.navigateByUrl('/mobile/auth')
    return false
  }

  userService.get({}).subscribe(response => {
    if (response.code != 200) {
      router.navigateByUrl('/mobile/auth')
    }
  })

  return true
};
