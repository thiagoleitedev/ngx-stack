export interface TableConfig {
  columnMode?: string
  columns: {
    field: string
    label: string
    action?: string
  }[]
  cssClasses: {
    sortAscending: string
    sortDescending: string
    pagerLeftArrow: string
    pagerRightArrow: string
  }
  footerHeight: number
  headerHeight: number
  limit: number
  loadingIndicator: boolean
  messages: {
    emptyMessage: string
    totalMessage: string
  }
  offset: number
  sortType: string
}
