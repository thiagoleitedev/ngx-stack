import { Injectable } from '@angular/core'
import { RealTime, FireLoopRef, Todo } from '@ngx-plus/ngx-sdk'
import { Subscription } from 'rxjs/Subscription'
import { NgxUiService } from '../../ui'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class TodoService {

  public subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    private ui: NgxUiService,
  ) { }

}
