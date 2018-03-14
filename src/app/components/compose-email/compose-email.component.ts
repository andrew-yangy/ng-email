import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../@core/data/settings';
import { FormBuilder, FormGroup, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { EmailService } from '../../@core/service/email.service';
import { MessageService } from 'primeng/components/common/messageservice';
import 'rxjs/add/operator/finally';

@Component({
    selector: 'compose-email',
    templateUrl: 'compose-email.component.html'
})

export class ComposeEmailComponent implements OnInit {
    emailForm: FormGroup;
    ifDisplayBCC: boolean;
    ifSending: boolean;
    constructor(
        private fb: FormBuilder,
        private settingsService: SettingsService,
        private emailService: EmailService,
        private messageService: MessageService) {
        this.createForm();
    }

    ngOnInit() {
    }
    createForm() {
        this.emailForm = this.fb.group({
            from: this.fb.group(this.settingsService.user),
            to: [[], Validators.required],
            cc: [[]],
            bcc: [[]],
            subject: [''],
            text: ['']
        });
        this.messageService.clear();
    }
    hideBcc() {
        this.ifDisplayBCC = this.emailForm.get('cc').value.length || this.emailForm.get('bcc').value.length;
    }
    onSubmit() {
        console.log(this.emailForm.value);
        this.messageService.clear();
        this.ifSending = true;
        this.emailService.sendEmail(this.emailForm.value)
            .finally(() => this.ifSending = false)
            .subscribe(() => { });
    }
}
