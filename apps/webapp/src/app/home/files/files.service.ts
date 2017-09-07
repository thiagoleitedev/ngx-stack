import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { ContainerApi, Container } from '@ngx-plus/ngx-sdk'
export { Container } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/map'

import { FileActions } from '../../state'

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
    private api: ContainerApi,
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

  delete(item) {
    this.store.dispatch(new FileActions.DeleteContainer(item))
  }
}
