import { Injectable } from '@angular/core'
import { ANIMATION_TYPES } from 'ngx-loading'

@Injectable()
export class AppConfig {
  public loader = {
    animationType: ANIMATION_TYPES.rectangleBounce,
    fullScreenBackdrop: true,
  }

  public ui = {
    authHeaderImg: 'assets/img/ngx-plus-light.svg',
    headerImg: 'assets/img/ngx-plus.svg',
    postHeaderImg: 'plus',
    preHeaderImg: 'ngx',
    sidebarNav: [
      {
        title: '',
        items: [
          {
            name: 'Dashboard',
            link: '/dashboard',
            icon: 'fa fa-fw fa-tachometer',
          },
        ],
      },
      {
        title: 'Home',
        items: [
          {
            name: 'Projects',
            link: '/home/projects',
            icon: 'fa fa-fw fa-calendar-check-o',
          },
          {
            name: 'Storage',
            link: '/home/storage',
            icon: 'fa fa-fw fa-server',
          },
        ],
      },
      {
        title: 'Admin',
        items: [
          { name: 'Users', link: '/admin/users', icon: 'fa fa-fw fa-users' },
          { name: 'Roles', link: '/admin/roles', icon: 'fa fa-fw fa-tags' },
          {
            name: 'Controls',
            link: '/admin/controls',
            icon: 'fa fa-fw fa-sliders',
          },
        ],
      },
    ],
  }
}
