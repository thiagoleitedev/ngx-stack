import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  LoopBackConfig,
  StorageApi,
  StorageContainerApi,
  StorageContainer,
} from '@ngx-plus/ngx-sdk'
export { StorageContainer as Container } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/map'

import { StorageActions } from '../../state'

@Injectable()
export class StorageService {
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
        classNames: 'btn btn-danger btn-block',
        click: { type: 'Cancel' },
      },
      {
        label: 'Save',
        type: 'button',
        classNames: 'btn btn-success btn-block text-white',
        click: { type: 'Save' },
      },
    ],
  }
  public uploadConfig = {
    concurrency: 1,
    container: 'none',
    showList: true,
    url: '',
  }

  constructor(
    private api: StorageApi,
    private containerApi: StorageContainerApi,
    private store: Store<any>,
  ) {
    this.items$ = this.store.select('home').map(home => home.storage)
    this.selected$ = this.items$.map(items => items.entities[items.selectedId])
  }

  setUploadUrl() {
    this.uploadConfig.url = [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      'Storages',
      this.uploadConfig.container,
      'upload',
    ].join('/')
  }

  setSelected(item) {
    this.store.dispatch(new StorageActions.SelectContainer(item))
    this.selected = item
    this.uploadConfig.container = item.name
    this.setUploadUrl()
  }

  get(id): Observable<any> {
    return this.containerApi.find({ where: { name: id }, include: 'files' })
  }

  getFiles(container): Observable<any> {
    return this.api.getFiles(container)
  }

  create(item) {
    this.store.dispatch(new StorageActions.CreateContainer(item))
  }

  read(item = {}) {
    this.store.dispatch(new StorageActions.ReadContainers(item))
  }

  updateSelected() {
    this.read({ where: { id: this.selected.id }, include: 'files' })
  }

  delete(item) {
    this.store.dispatch(new StorageActions.DeleteContainer(item))
  }

  deleteFile(item) {
    this.store.dispatch(new StorageActions.DeleteFile(item))
  }

  download(item, successCb, errorCb): Subscription {
    return this.api
      .download(item.container, item.file)
      .subscribe(successCb, errorCb)
  }
}
