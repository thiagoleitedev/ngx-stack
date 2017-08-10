import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../services/ngx-ui'

@Component({
  selector: 'ngx-toolbar',
  template: `
  <div class="row align-items-center justify-content-center toolbar-wrapper">
    <div class="col align-self-center">
      <div [(ngModel)]="viewSelection"
           ngbRadioGroup
           name="viewSelection">
        <label ngbButtonLabel class="btn-outline-success">
          <input ngbButton type="radio" value="table">
          <i class="fa fa-fw fa-table"></i>
        </label>
        <label ngbButtonLabel class="btn-outline-success">
          <input ngbButton type="radio" value="cards">
          <i class="fa fa-fw fa-th-large"></i>
        </label>
      </div>
    </div>
    <div class="col-12 col-md-5">
      <div class="input-group">
        <input type="text"
               class="form-control"
               placeholder="search"
               [(ngModel)]="search"
               (keyup)="action.emit({ type: 'Filter', payload: search })">
        <span class="input-group-btn">
          <button class="btn btn-primary"
                  type="button"
                  (click)="action.emit({ type: 'Filter', payload: search })">
            <i class="fa fa-fw fa-search"></i>
          </button>
        </span>
      </div>
    </div>
    <div class="col">
      <div ngbDropdown>
        <button class="btn btn-outline-success float-right border-1 row-options"
                id="rowsDrop"
                ngbDropdownToggle>{{ rowsPerPage }}
        </button>
        <div class="dropdown-menu dropdown-menu-right"
             aria-labelledby="rowsDrop">
          <button *ngFor="let option of rowOptions"
                  class="dropdown-item"
                  (click)="action.emit({ type: 'SelectRowsPerPage', payload: option }); rowsPerPage = option"
                  [class.bg-success]="rowsPerPage === option"> {{ option }}
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .bg-success {
      color: #fff;
    }
    .btn-outline-primary:after {
      float: right;
    }
    .dropdown-menu {
      min-width: 100px;
    }
    .row-options {
      border: 1px solid;
      box-shadow: none;
      width: 100px;
    }
    .toolbar-wrapper {
      background: #f5f5f5;
      margin-top: -20px;
      padding   : 10px 0;
    }
  `]
})
export class ToolbarComponent {

  @Input() rowsPerPage: number = 10
  @Input() rowOptions = [10, 25, 50, 100]
  @Input() viewSelection = 'table'

  @Output() action = new EventEmitter()

  public search: string

  constructor() { }

}
