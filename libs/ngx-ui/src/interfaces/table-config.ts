import { TemplateRef } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'

import { NgxActionButton } from './buttons'

export interface TableConfig {
  actionButtons?: NgxActionButton[]
  columnMode?: string
  columns: {
    field: string
    label?: string
    name?: string
    action?: string
    cellTemplate?: any
    headerTemplate?: any
  }[]
  count$: Observable<number>
  currentPage?: number
  cssClasses?: {
    sortAscending: string
    sortDescending: string
    pagerLeftArrow: string
    pagerRightArrow: string
  }
  filteredCount?: number
  filteredItems$?: Observable<any[]>
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
