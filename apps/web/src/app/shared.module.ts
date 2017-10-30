import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgxUiModule } from './ui'

const modules = [CommonModule, NgxUiModule]

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
