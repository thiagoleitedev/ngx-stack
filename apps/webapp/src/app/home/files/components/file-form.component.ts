import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'

import { FilesService } from '../files.service'

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

  constructor(
    public service: FilesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.item = this.service.selected
  }

  handleAction(event) {
    switch (event.type) {
      case 'Cancel':
        return this.router.navigate(['/home/files'])
      default:
        return console.log('$event', event)
    }
  }
}
