import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'ngx-card-header-brand',
  template: `
    <h1 class="text-center mb-3">
      {{ preHeaderImg || '' }}
      <img [src]="headerImg"
           class="rounded mx-auto inline-block"
           height="80px" />
      {{ postHeaderImg || '' }}
    </h1>
  `,
})
export class CardHeaderBrandComponent {

  @Input() headerImg: string
  @Input() postHeaderImg: string
  @Input() preHeaderImg: string

  constructor() { }

}
