import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core'
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, NgUploaderService } from 'ngx-uploader'
// import { FileUploader } from '../../../interfaces'

export interface FormData {
  concurrency: number
  autoUpload: boolean
  verbose: boolean
}

@Component({
  selector: 'ngx-file-uploader-list',
  templateUrl: 'file-uploader-list.component.html',
  styles: [`

  `]
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
