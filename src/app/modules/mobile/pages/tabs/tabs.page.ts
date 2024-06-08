import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public mobilePages: any = [];

  userRole: string = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    this.userService.currentUserRole.subscribe(role => {
      this.userRole = role

      if (this.userRole === 'Profesional') {
        this.mobilePages = [
          { title: 'Pacientes', url: 'patients', icon: 'heart-outline' },
        ]
      }

      if (this.userRole === 'Administrador') {
        this.mobilePages = [
          { title: 'Usuarios', url: 'users', icon: 'people-outline' },
          { title: 'Pacientes', url: 'patients', icon: 'heart-outline' },
          { title: 'Reportes', url: 'reports', icon: 'book-outline' },
          { title: 'Configuración', url: 'configuration', icon: 'settings-outline' },
        ]
      }
    })

  }

}
