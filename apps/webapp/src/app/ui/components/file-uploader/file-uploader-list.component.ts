import { Component, Input, Output, EventEmitter } from '@angular/core'
import { UploadInput } from 'ngx-uploader'

@Component({
  selector: 'ngx-file-uploader-list',
  templateUrl: 'file-uploader-list.component.html',
})
export class FileUploaderListComponent {
  @Input() files
  @Output() action

  constructor() {
    this.action = new EventEmitter<UploadInput>()
  }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
