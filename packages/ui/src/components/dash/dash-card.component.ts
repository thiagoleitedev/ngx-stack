import { Component, Input, Output, EventEmitter } from '@angular/core'
import { DashCard } from '../../services/ngx-ui'

@Component({
  selector: 'ngx-dash-cards',
  template: `
    <div class="container-fluid">
      <div *ngIf="dashCards"
           class="row ml-0 align-items-center justify-content-center">
        <div *ngFor="let item of dashCards"
             class="col-12 col-md-6 col-lg-4 col-xl-3 dash-card">
          <a class="dash-card"
             [routerLink]="item.link"
             routerLinkActive="active">
            <div class="row align-items-center justify-content-center">
              <div [class]="'col-4 dash-card-left p-0 bg-' + item.class">
                <div [class]="'card card-outline-' + item.class">
                  <div class="card-block p-0 text-center">
                    <i [class]="'fa fa-fw fa-' + item.icon"></i>
                  </div>
                </div>
              </div>
              <div class="col-8">
                <div [class]="'dash-card-right card card-outline-' + item.class">
                  <div class="card-block text-center">
                    <h4 [class]="'card-title text-center mb-1 text-' + item.class">
                      {{ item.name }}
                    </h4>
                    <h4 class="mb-0">
                      <span [class]="'badge badge-' + item.class">
                        {{ (item.data | async) || 0 }}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dash-card {
      height         : 100px;
      margin-bottom  : 10px;
      text-decoration: none;
    }

    .dash-card-left {
      align-items : center;
      border-right: 0;
      color       : #fcfcfc;
    }

    i {
      font-size: 38px;
      padding: 15px 0;
    }

    .dash-card-right {
      background : #fcfcfc;
      margin-left: -15px;
    }
  `]
})
export class DashCardComponent {

  @Input() dashCards: DashCard[]

  constructor() { }

}
