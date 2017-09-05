import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  AccountApi,
  Account,
  ContainerApi,
  Container,
  AccessToken,
} from '@ngx-plus/ngx-sdk'
export { Container } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../ui'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/map'

import { FileActions, UserActions } from '../../state'

@Injectable()
export class FilesService {
  public items$: Observable<any>
  public selected$: Observable<any>
  public selected: any
  public formConfig = {
    fields: {
      name: 'input',
    },
    buttons: [
      {
        label: 'Cancel',
        type: 'button',
        classNames: 'btn btn-danger col-lg-6',
        click: { type: 'Cancel' },
      },
      {
        label: 'Save',
        type: 'button',
        classNames: 'btn btn-success text-white col-lg-6',
        click: { type: 'Save' },
      },
    ],
  }
  public uploadConfig = {
    concurrency: 1,
    container: 'none',
    showList: true,
    url: 'http://localhost:3000/api/Containers',
  }

  constructor(
    private userApi: AccountApi,
    private api: ContainerApi,
    private ui: NgxUiService,
    private store: Store<any>
  ) {
    this.items$ = this.store.select('home').map(home => home.files)
    this.selected$ = this.items$.map(items => items.selected)
  }

  setSelected(item) {
    this.store.dispatch(new FileActions.SelectContainer(item))
    this.selected = item
    this.uploadConfig.container = item.name
  }

  get(name): Observable<any> {
    return this.api.find({ where: { name: name } })
  }

  getFiles(name): Observable<any> {
    return this.api.getFiles(name)
  }

  create(item) {
    this.store.dispatch(new FileActions.CreateContainer(item))
  }

  read(item = {}) {
    this.store.dispatch(new FileActions.ReadContainers(item))
  }

  download(item, successCb, errorCb) {
    this.api.download(item.container, item.file).subscribe(successCb, errorCb)
  }

  delete(item) {
    this.store.dispatch(new FileActions.DeleteContainer(item))
  }
}
