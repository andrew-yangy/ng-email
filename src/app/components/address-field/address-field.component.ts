import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../@core/model';
import { ContactService } from '../../@core/service/contact.service';
import { FormGroup, FormControl } from '@angular/forms';
import { map, filter, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'address-field',
    template: `
		<div class="ui-inputgroup" [formGroup]="form">
			<span class="ui-inputgroup-addon">{{label}}:</span>
			<tag-input [formControlName]="formName"
								 secondaryPlaceholder='' placeholder
								 (onFocus)="focus.emit(formName); showIcon=true"
								 [onAdding]="onAdding.bind(this)"
								 [errorMessages]="errorMsg"
								 (onTextChange)="errorMsg = null"
								 [displayBy]="'name'" [identifyBy]="'email'">
				<tag-input-dropdown [autocompleteObservable]='matchedContacts' [matchingFn]="matchingfn"
														[displayBy]="'name'" [identifyBy]="'email'">
					<ng-template let-item="item" let-index="index">
						<strong>{{ item.name }}</strong> {{ item.email }}
					</ng-template>
				</tag-input-dropdown>
			</tag-input>
		</div>
		<div *ngIf="errorMsg" class="ui-message ui-messages-error ui-corner-all">
				{{errorMsg}}
		</div>
	`,
    styleUrls: ['./address-field.component.css']
})

export class AddressFieldComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() label: string;
    @Input() formName: string;
    @Output() public focus = new EventEmitter<string>();
    errorMsg: string;
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

    onAdding(tag) {
        const validateAddreess = (text: any) => {
            // tslint:disable-next-line:max-line-length
            const pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const valid = (text instanceof Object) || pureEmail.test(text);
            if (!valid) {
                this.errorMsg = 'The email address is invalid.';
            }
            return valid;
        };
        return of(tag)
            .pipe(
                filter(validateAddreess),
        );
    }
}
