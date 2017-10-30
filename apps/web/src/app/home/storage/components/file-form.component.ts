import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'

import { StorageService } from '../storage.service'

@Component({
  selector: 'ngx-file-form',
  template: `
    <ngx-file-uploader [config]="service.uploadConfig"
                       (action)="handleAction($event)">
    </ngx-file-uploader>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileFormComponent implements OnInit {
  public uploadConfig
  public item

  constructor(public service: StorageService, private router: Router) {}

  ngOnInit() {
    this.item = this.service.selected
  }

  handleAction(event) {
    switch (event.type) {
      case 'Done': {
        return this.service.updateSelected()
      }
      case 'Exit': {
        return this.router.navigate(['/home/storage'])
      }
      default: {
        return console.log('$event', event)
      }
    }
  }
}
