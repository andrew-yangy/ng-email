import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../@core/model';
import { ContactService } from '../../@core/service/contact.service';
import { FormGroup, FormControl } from '@angular/forms';
import { map, filter, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { EmailService } from '../../@core/service/email.service';

@Component({
    selector: 'address-field',
    templateUrl: './address-field.component.html',
    styleUrls: ['./address-field.component.css']
})

export class AddressFieldComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() label: string;
    @Input() formName: string;
    @Output() public focus = new EventEmitter<string>();
    errorMsg: string;
    constructor(
        private contactService: ContactService,
        private emailService: EmailService) {
    }

    ngOnInit() {
    }

    matchedContacts = () => {
        return this.contactService.getContacts();
    }

    matchingfn(value: string, target: User) {
        const valueLowerCase = value.toLowerCase();
        return target.name.toLowerCase().includes(valueLowerCase) || target.email.toLowerCase().includes(valueLowerCase);
    }

    onAdding(tag) {
        const validateAddreess = (text: any) => {
            const valid = (text instanceof Object) || this.emailService.validateEmail(text);
            if (!valid) {
                this.errorMsg = 'The email address is invalid.';
            }
            return valid;
        };
        return of(tag)
            .pipe(
                filter(validateAddreess)
            );
    }
}
