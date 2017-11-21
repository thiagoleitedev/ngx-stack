import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import { NgxRadioButtons } from '../../../interfaces'

@Component({
  selector: 'ngx-radio-buttons',
  template: `
    <form [formGroup]="radioGroup">
      <div ngbRadioGroup
           class="btn-group"
           name="radioBasic"
           formControlName="option">
        <label ngbButtonLabel
               class="btn-outline-success"
               *ngFor="let option of config.options">
        <input ngbButton
               type="radio"
               [value]="option.value"
               (click)="handleAction({ type: 'RadioSelection', payload: option.value })">
          <i [class]="option.icon"></i>
        </label>
      </div>
    </form>
  `,
  styles: [
    `
    .bg-success {
      color: #fff;
    }
    label {
      cursor: pointer;
      min-width: 75px;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonsComponent implements OnInit {
  @Input() config: NgxRadioButtons
  @Output() action = new EventEmitter()

  public radioGroup: FormGroup

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.radioGroup = this.formBuilder.group({
      option: this.config.selected,
    })
  }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
