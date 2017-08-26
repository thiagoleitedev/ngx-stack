import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { RoleActions } from '../../../state'
import { NgxUiService, NgxFormConfig } from '../../../ui'
import { Role, RolesService } from '../roles.service'

@Component({
  selector: 'ngx-role-form',
  template: `
    <ngx-form *ngIf="service.selected$ | async"
              [config]="service.formConfig"
              [item]="service.selected$ | async"
              (action)="handleAction($event)">
    </ngx-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleFormComponent implements OnInit {
  public formConfig: NgxFormConfig
  public item$: Observable<any>

  constructor(
    public service: RolesService,
    private ui: NgxUiService,
    private router: Router,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.formConfig = this.service.formConfig
  }

  handleAction(event) {
    switch (event.type) {
      case 'Save':
        this.service.update(event.payload)
        return this.handleAction({ type: 'Cancel' })
      case 'Cancel':
        return this.router.navigate(['/admin/roles'])
      default:
        return console.log('$event', event)
    }
  }
}
