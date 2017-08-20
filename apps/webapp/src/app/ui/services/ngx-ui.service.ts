import { Injectable } from '@angular/core'
import { NgxFormsService } from '@ngx-plus/ngx-forms'
import { NgxAlertsService } from '@ngx-plus/ngx-alerts'
import { assign, noop } from 'lodash'
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb'
import {
  NgbModal,
  NgbActiveModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'

import { ModalComponent } from '../components/modal/modal.component'
import { NavItem } from '../interfaces'

@Injectable()
export class NgxUiService {
  public isLargeScreen: boolean

  // public modalRef: NgbModalRef
  public headerActive: boolean
  public headerImg: string
  public authHeaderImg: string
  public preHeaderImg: string
  public postHeaderImg: string

  public sidebarActive: boolean
  public sidebarOpen: boolean
  public sidebarNav: NavItem[]

  public morebarActive: boolean
  public morebarOpen: boolean

  public footerActive: boolean

  constructor(
    public alerts: NgxAlertsService,
    public forms: NgxFormsService,
    public breadcrumb: BreadcrumbService
  ) {
    this.checkLargeScreen()
    this.sidebarActive = true
    this.headerActive = true
    this.footerActive = true
    if (this.isLargeScreen) {
      this.sidebarOpen = true
    } else {
      this.sidebarOpen = false
    }
  }

  checkLargeScreen(): void {
    if (window.innerWidth > 700) {
      this.isLargeScreen = true
    } else {
      this.isLargeScreen = false
    }
  }

  setHeaderImg(item) {
    this.headerImg = item
  }

  setAuthHeaderImg(item) {
    this.authHeaderImg = item
  }

  setPreHeaderImg(item) {
    this.preHeaderImg = item
  }

  setPostHeaderImg(item) {
    this.postHeaderImg = item
  }

  activateHeader(): void {
    this.headerActive = true
  }

  deactivateHeader(): void {
    this.headerActive = false
  }

  activateSidebar(): void {
    this.sidebarActive = true
  }

  deactivateSidebar(): void {
    this.sidebarActive = false
    this.sidebarOpen = false
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen
  }

  activateMorebar(): void {
    this.morebarActive = true
  }

  deactivateMorebar(): void {
    this.morebarActive = false
    this.morebarOpen = false
  }

  toggleMorebar(): void {
    this.morebarOpen = !this.morebarOpen
  }

  getSidebarNav(): NavItem[] {
    return this.sidebarNav
  }

  setSidebarNav(nav: NavItem[]): void {
    this.sidebarNav = nav
  }

  activateFooter(): void {
    this.footerActive = true
  }

  deactivateFooter(): void {
    this.footerActive = false
  }
}
