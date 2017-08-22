import { Observable } from 'rxjs/Observable'

import { ActionButton } from './action-button'

export interface TableConfig {
  actionButtons?: ActionButton[]
  columnMode?: string
  columns: {
    field: string
    label?: string
    name?: string
    action?: string
  }[]
  count$: Observable<number>
  currentPage?: number
  cssClasses?: {
    sortAscending: string
    sortDescending: string
    pagerLeftArrow: string
    pagerRightArrow: string
  }
  filteredItems?: any[]
  footerHeight?: number
  headerHeight?: number
  items$: Observable<any[]>
  limit?: number
  loadingIndicator?: boolean
  messages?: {
    emptyMessage: string
    totalMessage: string
  }
  offset?: number
  sortType?: string
}
