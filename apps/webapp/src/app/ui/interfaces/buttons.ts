import { Observable } from 'rxjs/Observable'

export interface ActionButton {
  action: string
  class?: string
  icon?: string
  item?: any
  label?: string
}
export interface DropButton {
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
export interface RadioButtons {
  options: {
    value: string
    icon: string
  }[]
  selected: string
}
