import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { filter } from 'rxjs';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  currentRoute: string = '';

  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getCurrentRoute();
    this.checkIsMobile();
  }

  checkIsMobile() {
    if (this.platform.is('mobile')) {
      if (this.currentRoute == '') {
        // this.router.navigate(['/mobile/tabs/home'])
      }
    } else {
      console.log('No es un dispositivo móvil.');
    }
  }

  getCurrentRoute() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  // requestPermissions() {
  //   this.androidPermissions.requestPermissions(
  //     [
  //       this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
  //       this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
  //       this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE
  //     ]
  //   );
  // }
}
