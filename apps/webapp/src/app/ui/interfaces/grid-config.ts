import { CardConfig } from './card-config'
import { TableConfig } from './table-config'
import { ToolbarConfig } from './toolbar-config'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

export interface GridConfig {
  card: CardConfig
  table: TableConfig
  toolbar: ToolbarConfig
  searchItem$?: BehaviorSubject<string>
}
