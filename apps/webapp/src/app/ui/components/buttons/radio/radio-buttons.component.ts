import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../../services'

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
               *ngFor="let option of options">
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
    }
  `,
  ],
})
export class RadioButtonsComponent implements OnInit {
  @Input()
  options: {
    value: string
    icon: string
  }[]
  @Input() selected: string
  @Output() action = new EventEmitter()

  public radioGroup: FormGroup

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.radioGroup = this.formBuilder.group({
      option: this.selected,
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
