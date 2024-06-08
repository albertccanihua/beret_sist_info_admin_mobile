import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  optionButtons: any[] = [];

  constructor(
    private router: Router
  ) {
    this.optionButtons = [
      {
        thumbnail: 'PA',
        label: 'Seguimiento',
        text: 'Reporte',
        path: '/mobile/reports/follow-up'
      },
      {
        thumbnail: 'ES',
        label: 'Control - General',
        text: 'Reporte',
        path: '/mobile/reports/control-general'
      },
      {
        thumbnail: 'TD',
        label: 'Control - Profesional',
        text: 'Reporte',
        path: '/mobile/reports/control-professional'
      }
    ];
  }

  ngOnInit() {
    console.log();
  }

  signOut() {
    localStorage.clear();
    this.router.navigateByUrl('/mobile/auth')
  }
}
