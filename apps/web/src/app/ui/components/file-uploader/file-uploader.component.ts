import { Component, Input, Output, EventEmitter } from '@angular/core'
import {
  NgUploaderService,
  UploadOutput,
  UploadInput,
  UploadFile,
  UploadStatus,
  humanizeBytes,
} from 'ngx-uploader'

import { FileUploader } from '../../interfaces'

@Component({
  selector: 'ngx-file-uploader',
  templateUrl: './file-uploader.component.html',
  styles: [
    `
    .drop-container {
      background: #f5f5f5;
      border: 3px dashed #ccc;
      margin-bottom: 20px;
      padding: 20px;
      text-align: center;
    }
    .is-drop-over {
      border-color: #61b5d9;
    }
    input {
      cursor: pointer !important;
      text-align: center;
    }
  `,
  ],
})
export class FileUploaderComponent {
  @Input() config: FileUploader
  @Output() action
  @Output() uploadInput

  files: UploadFile[]
  humanizeBytes: Function
  dragOver: boolean
  percent: number
  uploading: boolean

  constructor() {
    this.files = [] // local uploading files array
    this.action = new EventEmitter<any>()
    this.uploadInput = new EventEmitter<UploadInput>() // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes
    this.uploading = false
    if (!this.config) {
      this.config = {
        concurrency: 1,
        container: '',
        showList: true,
        url: '',
      }
    }
  }

  onUploadOutput(output: UploadOutput) {
    switch (output.type) {
      case 'addedToQueue': {
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file)
        }
        return this.action.emit({ type: 'AddedToQueue', payload: output })
      }
      case 'done': {
        return this.action.emit({ type: 'Done', payload: output })
      }
      case 'dragOut':
      case 'drop': {
        return (this.dragOver = false)
      }
      case 'dragOver': {
        return (this.dragOver = true)
      }
      case 'removed': {
        // remove file from array when removed
        this.files = this.files.filter(
          (file: UploadFile) => file !== output.file,
        )
        return this.action.emit({ type: output.type, payload: output })
      }
      case 'start': {
        return this.action.emit({ type: output.type, payload: output })
      }
      case 'uploading': {
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex(
            file =>
              typeof output.file !== 'undefined' && file.id === output.file.id,
          )
          this.files[index] = output.file
        }
        return this.action.emit({ type: output.type, payload: output })
      }
      default: {
        return this.action.emit({ type: output.type, payload: output })
      }
    }
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id })
  }

  handleAction(event) {
    switch (event.type) {
      case 'Exit': {
        return this.action.emit(event)
      }
      case 'RemoveAllFiles': {
        return this.files.forEach(file =>
          this.handleAction({ type: 'RemoveFile', payload: file.id }),
        )
      }
      case 'RemoveFile': {
        return this.uploadInput.emit({ type: 'remove', id: event.payload })
      }
      case 'StartUpload': {
        const event: UploadInput = {
          type: 'uploadAll',
          url: this.config.url,
          method: 'POST',
        }
        return this.uploadInput.emit(event)
      }
      default: {
        return this.uploadInput.emit(event)
      }
    }
  }
}
