import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  VERSION,
} from '@angular/core'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() config
  @Input()
  footerLeft = `<a href="https://github.com/ngx-plus/ngx-admin">@ngx-plus/ngx-admin</a>`
  @Input() footerRight

  constructor(public ui: NgxUiService) {}

  ngOnInit() {
    if (!this.footerRight) {
      const ngVersion = VERSION.full
      this.footerRight = `@angular: v${ngVersion}`
    }
  }
}
