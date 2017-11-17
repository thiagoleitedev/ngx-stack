import { Injectable } from '@angular/core'
import { NgxFormsService } from '@ngx-plus/ngx-forms'
export { NgxFormConfig } from '@ngx-plus/ngx-forms'
import { NgxAlertsService } from '@ngx-plus/ngx-alerts'
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'

import { ModalComponent } from '../components/modal/modal.component'
import { NavItem } from '../interfaces'

@Injectable()
export class NgxUiService {
  public isLargeScreen: boolean

  public modalRef: NgbModalRef
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

  constructor(public alerts: NgxAlertsService, public forms: NgxFormsService, public modal: NgbModal) {
    this.checkScreenSize()
  }

  checkScreenSize(): void {
    if (window.innerWidth > 700) {
      this.isLargeScreen = true
    } else {
      this.isLargeScreen = false
    }
  }

  setModalRef(ref: NgbModalRef) {
    this.modalRef = ref
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

  getSidebarNav(): NavItem[] {
    return this.sidebarNav
  }

  setSidebarNav(nav: NavItem[]): void {
    this.sidebarNav = nav
  }
}
