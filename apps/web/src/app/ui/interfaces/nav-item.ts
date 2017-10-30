export interface NavItem {
  title?: string
  items: {
    name: string
    icon: string
    link: string
    isNew?: boolean
  }[]
}
