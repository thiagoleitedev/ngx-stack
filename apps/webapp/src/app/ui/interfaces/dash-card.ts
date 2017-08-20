import { Observable } from 'rxjs/Observable'

export interface DashCard {
  name: string
  icon: string
  data: Observable<any>
  link: string
  class: string
}
