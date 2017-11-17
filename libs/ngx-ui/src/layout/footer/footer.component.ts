import { Component, OnInit, Input, ChangeDetectionStrategy, VERSION } from '@angular/core'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-footer',
  template: `
    <div *ngIf="config.footer.active"
         class="navbar fixed-bottom footer"
         [class.open]="config.sidebar.open">
      <div class="text-left"
           [innerHtml]="footerLeft">
      </div>
      <div class="text-right"
           [innerHtml]="footerRight">
      </div>
    </div>
  `,
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() config
  @Input() footerLeft = `<a href="https://github.com/ngx-plus/ngx-stack">@ngx-plus/ngx-stack</a>`
  @Input() footerRight

  constructor(public ui: NgxUiService) {}

  ngOnInit() {
    if (!this.footerRight) {
      const ngVersion = VERSION.full
      this.footerRight = `@angular: v${ngVersion}`
    }
  }
}
