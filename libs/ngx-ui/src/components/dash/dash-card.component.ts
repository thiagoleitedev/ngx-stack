import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { DashCard } from '../../interfaces'

@Component({
  selector: 'ngx-dash-cards',
  template: `
    <div class="container-fluid">
      <div *ngIf="items"
           class="row ml-0 align-items-center justify-content-center">
        <div *ngFor="let item of items"
             class="col-12 col-md-6 col-lg-4 col-xl-3 dash-card">
          <a class="dash-card"
             [routerLink]="item.link"
             routerLinkActive="active">
            <div class="row align-items-center justify-content-center">
              <div [class]="'col-4 dash-card-left p-0 bg-' + item.class">
                  <div [class]="'card-body p-0 text-center text-' + item.class">
                    <i [class]="'text-white ' + item.icon"></i>
                  </div>
              </div>
              <div class="col-8">
                <div [class]="'dash-card-right card border-' + item.class">
                  <div class="card-body text-center">
                    <h4 [class]="'card-title text-center mb-1 text-' + item.class">
                      {{ item.name }}
                    </h4>
                    <h4 class="mb-0">
                      <span [class]="'text-white badge badge-' + item.class">
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
  styles: [
    `
    .dash-card {
      height         : 100px;
      margin-bottom  : 10px;
      text-decoration: none;
    }

    i {
      font-size: 38px;
      padding: 15px 0;
    }

    .dash-card-right {
      background : #fcfcfc;
      margin-left: -15px;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashCardComponent {
  @Input() items: DashCard[]
}
