import { NavItem } from './nav-item'

export interface CardConfig {
  cardTitle: string
  headerBg?: string
  headerImg?: string
  icon?: string
  nav?: NavItem
  postHeaderImg?: string
  preHeaderImg?: string
  showSearch?: boolean
  subTitle?: string
}
