import { Component, Input, Output, EventEmitter } from '@angular/core'
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader'

@Component({
  selector: 'ngx-file-uploader',
  templateUrl: './file-uploader.component.html',
  styles: [`
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
    .start-upload-btn {
      color: #fff;
      float: right;
      margin-bottom: 15px;
    }
  `]
})
export class FileUploaderComponent {
  @Input() config = {
    concurrency: 1,
    container: 'test',
    showList: true,
    url: 'http://localhost:3000/api/Containers',
  }
  @Output() action
  @Output() uploadInput

  files: UploadFile[]
  humanizeBytes: Function
  dragOver: boolean

  constructor() {
    this.files = [] // local uploading files array
    this.action = new EventEmitter<any>()
    this.uploadInput = new EventEmitter<UploadInput>() // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' },
      //   concurrency: 0
      // }
      // this.uploadInput.emit(event)
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file)
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id)
      this.files[index] = output.file
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file)
    } else if (output.type === 'dragOver') {
      this.dragOver = true
    } else if (output.type === 'dragOut') {
      this.dragOver = false
    } else if (output.type === 'drop') {
      this.dragOver = false
    }
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id })
  }

  handleAction(event) {
    switch (event.type) {
      case 'Cancel': {
        return this.action.emit(event)
      }
      case 'RemoveAllFiles': {
        return this.files.forEach(file => this.handleAction({ type: 'RemoveFile', payload: file.id }))
      }
      case 'RemoveFile': {
        return this.uploadInput.emit({ type: 'remove', id: event.payload })
      }
      case 'StartUpload': {
        const uploadUrl = `${this.config.url}/${this.config.container}/upload`
        const event: UploadInput = {
          concurrency: this.config.concurrency,
          type: 'uploadAll',
          url: uploadUrl,
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
