import { Observable } from 'rxjs/Observable'

export interface NavItem {
  title?: string
  items: {
    name: string
    icon: string
    link: string
    isNew?: boolean
  }[]
}

export interface DashCard {
  name: string
  icon: string
  data: Observable<any>
  link: string
  class: string
}

export interface CardButton {
  class: string
  icon: string
  text: string
}

export * from './table-config'
