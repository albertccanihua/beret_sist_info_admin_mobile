import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('');
  }

  login() {
    this.userService.login(this.username, this.password).subscribe(response => {
      if (response.code === 200) {
        localStorage.setItem('token', response.result.token);
        localStorage.setItem('user_id', response.result.id.toString());
        localStorage.setItem('user_fullname', response.result.name + ' ' + response.result.paternal_surname)
        localStorage.setItem('role', response.result.type_role.name)

        this.userService.newUserRole(response.result.type_role.name)

        this.router.navigateByUrl('/');
      }
    });
  }

}
