import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../@core/model';
import {ContactService} from '../../@core/service/contact.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'address-field',
  template: `
    <div class="ui-inputgroup" [formGroup]="form">
      <span class="ui-inputgroup-addon">{{label}}:</span>
      <tag-input [formControlName]="formName"
                 secondaryPlaceholder='' placeholder
                 (onFocus)="onFocus.emit(formName)"
                 (onBlur)="onBlur.emit(formName)"
                 [displayBy]="'name'" [identifyBy]="'email'">
        <tag-input-dropdown [autocompleteObservable]='matchedContacts' [matchingFn]="matchingfn"
                            [displayBy]="'name'" [identifyBy]="'email'">
          <ng-template let-item="item" let-index="index">
            <strong>{{ item.name }}</strong> {{ item.email }}
          </ng-template>
        </tag-input-dropdown>
      </tag-input>
    </div>
  `,
  styles: [
    'tag-input {width: 100%}',
    '/deep/ .ng2-tag-input {padding-left: 10px !important;}'
  ]
})

export class AddressFieldComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() label: string;
  @Input() formName: string;
  @Output() public onFocus = new EventEmitter<string>();
  @Output() public onBlur = new EventEmitter<string>();

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
  }

  matchedContacts = () => {
    return this.contactService.getContacts();
  }

  matchingfn(value: string, target: User) {
    return target.name.toLowerCase().includes(value.toLowerCase()) || target.email.toLowerCase().includes(value.toLowerCase());
  }
}
