import { Observable } from 'rxjs/Observable'

export interface NgxActionButton {
  action: string
  class?: string
  icon?: string
  item?: any
  label?: string
}
export interface NgxDropButton {
  action?: string
  class?: string
  icon?: string
  label?: string
  options?: {
    key: any
    value: any
  }[]
  selected?: any
}
export interface NgxRadioButtons {
  options: {
    value: string
    icon: string
  }[]
  selected: string
}
