import { Component, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../services/ngx-ui'

@Component({
  selector: 'ngx-grid',
  template: `
    <div class="row align-items-center justify-content-center page-wrapper">
      <div *ngIf="rows"
           class="col-12">
        <ngx-toolbar [rowsPerPage]="rows"
                     (action)="handleAction($event)">
        </ngx-toolbar>
      </div>
      <div *ngIf="displayed"
           class="col-12">
        <ngx-table [columns]="columns"
                     [rows]="displayed"
                     (action)="handleAction($event)">
        </ngx-table>
      </div>
      <div *ngIf="items"
           class="col-12 pagination-wrapper">
        <div class="row align-items-center justify-content-between">
          <div class="col">
            <ngb-pagination [collectionSize]="filteredItems?.length || items.length"
                            [(page)]="page"
                            [pageSize]="rows"
                            (pageChange)="handleAction({ type: 'PageChange', payload: $event })">
            </ngb-pagination>
          </div>
          <div *ngIf="filtered"
               class="col">
            <h5 class="text-center m-0">
              Filtered Total: <div class="badge badge-success">{{ filteredItems?.length }}</div></h5>
          </div>
          <div class="col">
            <h5 class="text-right m-0">
              Total: <div class="badge badge-primary">{{ items.length }}</div></h5>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`

  `],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements AfterViewInit {

  @Input() columns: any
  @Input() items: any[]

  @Output() action = new EventEmitter()

  public displayed: any[]
  public filteredItems: any[]
  public page = 1
  public startIndex = 0
  public endIndex = 10
  public rows = 10
  public sortBy = ''
  public asc = true
  public filtered = false

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.refresh()
    this.cdr.detectChanges()
  }

  refresh() {
    this.startIndex = (this.page - 1) * this.rows
    this.endIndex = (this.rows * this.page) - 1
    this.displayed = this.filtered ?
      this.filteredItems.slice(this.startIndex, this.endIndex)
      : this.items.slice(this.startIndex, this.endIndex)
  }

  handleAction(event) {
    switch (event.type) {
      case 'SelectRowsPerPage':
        this.rows = event.payload
        return this.refresh()
      case 'PageChange':
        this.page = event.payload
        return this.refresh()
      case 'Filter':
        if (event.payload.length < 1) {
          this.filtered = false
          this.filteredItems = undefined
          return this.refresh()
        }
        const results = []
        const cols = this.columns.map(col => col.field)
        const searchString = event.payload.toString().toLowerCase().split(',').join('')
        this.items.forEach((item) => {
          const matchList = []
          cols.forEach(col => matchList.push(item[col]))
          const matchString = matchList.toString().toLowerCase().split(',').join('')
          if (matchString.indexOf(searchString) > -1) { results.push(item) }
        })
        this.filteredItems = results
        this.page = 1
        this.filtered = true
        return this.refresh()
      case 'SortByColumn':
        const col = event.payload
        const order = this.asc ? 'asc' : 'desc'
        if (this.sortBy === col) { this.asc = !this.asc }
        if (this.filtered) {
          this.asc ?
            this.filteredItems.sort((a, b) => {
              return a[col] - b[col]
            })
            : this.filteredItems.reverse()
        } else {
          this.asc ?
            this.items.sort((a, b) => {
              return a[col] - b[col]
            })
            : this.items.reverse()
        }
        this.sortBy = col
        return this.refresh()
      default:
        return console.log('$event', event)
    }
  }

}
