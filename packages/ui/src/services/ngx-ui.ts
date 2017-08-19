import { Injectable } from '@angular/core'
import { ToastyService, ToastyConfig } from 'ng2-toasty'
import { assign, noop } from 'lodash'
import swal, { SweetAlertOptions } from 'sweetalert2'
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb'
import {
  NgbModal,
  NgbActiveModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'

import { NgxFormsService } from '@ngx-plus/ngx-forms'
import { ModalComponent } from '../components/modal/modal.component'
import { NavItem } from '../interfaces'

@Injectable()
export class NgxUiService {
  public isLargeScreen: boolean

  // public modalRef: NgbModalRef
  public headerActive: boolean
  public headerImg: string
  public preHeaderImg: string
  public postHeaderImg: string

  public sidebarActive: boolean
  public sidebarOpen: boolean
  public sidebarNav: NavItem[]

  public footerActive: boolean

  constructor(
    public toastyService: ToastyService,
    public toastyConfig: ToastyConfig,
    // public form: NgxFormsService,
    public breadcrumb: BreadcrumbService
  ) {
    this.checkLargeScreen()
    this.toastyConfig.limit = 10
    this.toastyConfig.theme = 'bootstrap'
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

  toast(config: any): void {
    switch (config.type) {
      case 'error':
        this.toastError(config.title, config.msg)
        break
      case 'info':
        this.toastInfo(config.title, config.msg)
        break
      case 'success':
        this.toastSuccess(config.title, config.msg)
        break
      case 'wait':
        this.toastWait(config.title, config.msg)
        break
      case 'warning':
        this.toastWarning(config.title, config.msg)
        break
      default:
        this.toastDefault(config.title, config.msg)
        break
    }
  }

  toastDefault(title, msg) {
    this.toastyService.default({
      title,
      msg,
    })
  }

  toastError(title, msg) {
    this.toastyService.error({
      title,
      msg,
    })
  }

  toastInfo(title, msg) {
    this.toastyService.info({
      title,
      msg,
    })
  }

  toastSuccess(title, msg) {
    this.toastyService.success({
      title,
      msg,
    })
  }

  toastWait(title, msg) {
    this.toastyService.wait({
      title,
      msg,
    })
  }

  toastWarning(title, msg) {
    this.toastyService.warning({
      title,
      msg,
    })
  }

  alert(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions: any = {
      type: options.type || null,
      title: options.title || null,
      text: options.text || null,
      buttonsStyling: options.buttonsStyling || false,
      confirmButtonClass:
      options.confirmButtonClass || 'btn btn-lg btn-secondary',
      animation: options.animation || true,
      customClass: options.customClass || '',
    }

    if (closeCb !== noop) {
      defaultOptions.showCancelButton = options.showCancelButton || true
      defaultOptions.cancelButtonClass =
        options.cancelButtonClass || 'btn btn-lg btn-secondary'
    }

    return swal(assign(defaultOptions, options)).then(
      res => successCb(res),
      dismiss => closeCb(dismiss)
    )
  }

  alertSuccess(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions = {
      type: 'success',
      confirmButtonClass: 'btn btn-lg btn-success',
    }
    return this.alert(assign(defaultOptions, options), successCb, closeCb)
  }

  alertWarning(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions = {
      type: 'warning',
      confirmButtonClass: 'btn btn-lg btn-warning',
    }
    return this.alert(assign(defaultOptions, options), successCb, closeCb)
  }

  alertError(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions = {
      type: 'error',
      confirmButtonClass: 'btn btn-lg btn-danger',
    }
    return this.alert(assign(defaultOptions, options), successCb, closeCb)
  }

  alertInfo(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions = {
      type: 'info',
      confirmButtonClass: 'btn btn-lg btn-info',
    }
    return this.alert(assign(defaultOptions, options), successCb, closeCb)
  }

  alertQuestion(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions = {
      type: 'question',
      confirmButtonClass: 'btn btn-lg btn-primary',
    }
    return this.alert(assign(defaultOptions, options), successCb, closeCb)
  }

  confirm(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions: any = {
      type: options.type || 'warning',
      title: options.title || null,
      buttonsStyling: options.buttonsStyling || false,
      showConfirmButton: options.showConfirmButton || true,
      confirmButtonClass: options.confirmButtonClass || 'btn btn-lg btn-danger',
      confirmButtonText: options.confirmButtonText || 'Delete',
      animation: options.animation || true,
      customClass: options.customClass || '',
      showCancelButton: options.showCancelButton || true,
      cancelButtonClass:
      options.cancelButtonClass || 'btn btn-lg btn-secondary',
    }

    return swal(assign(defaultOptions, options)).then(
      res => successCb(res),
      dismiss => closeCb(dismiss)
    )
  }
}
