import { Component, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'

import { NgxUiService } from '../../services/ngx-ui'

@Component({
  selector: 'ngx-grid',
  template: `
    <div class="row align-items-center justify-content-center page-wrapper">
      <div class="col-12">
      </div>
      <div class="col-12">
        <ngx-table [columns]="columns"
                   [rows]="items$"
                   (action)="handleAction($event)">
        </ngx-table>
      </div>
      <div class="col-12 pagination-wrapper">
        <div class="row align-items-center justify-content-between">
          <div class="col">
            <ngb-pagination [collectionSize]="filteredItems?.length || (items$ | async)?.length"
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
              Total: <div class="badge badge-primary">{{ items$.length }}</div></h5>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements AfterViewInit {

  @Input() columns: any
  @Input() items$: Observable<any[]>

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
    // this.startIndex = (this.page - 1) * this.rows
    // this.endIndex = (this.rows * this.page) - 1
    // this.displayed = this.filtered ?
    //   this.filteredItems.slice(this.startIndex, this.endIndex)
    //   : this.items$.slice(this.startIndex, this.endIndex)
  }

  handleAction(event) {
    switch (event.type) {

      default:
        return console.log('$event', event)
    }
  }

}
