import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IShowUserApiResponse } from 'src/app/interfaces/user/show-user-api-response.interface';
import { DateHelper } from 'src/app/helpers/date.helper';
import { EventBusService } from 'src/app/services/service-bus.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {

  userId: string = '';
  user: IShowUserApiResponse | undefined;
  userCreatedAt: string = '';

  constructor(
    private _userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.showUser();
  }

  private showUser() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      this._userService.show(params.get('id')!).subscribe((data: IApiResponse<IShowUserApiResponse>) => {
        this.user = data.result;
        this.userCreatedAt = DateHelper.formatDate(this.user.created_at?.toString() ?? '');
      });
    });

  }

}
