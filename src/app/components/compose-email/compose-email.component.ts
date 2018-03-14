import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../@core/data/settings';
import { FormBuilder, FormGroup, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { EmailService } from '../../@core/service/email.service';
import { MessageService } from 'primeng/components/common/messageservice';
import 'rxjs/add/operator/finally';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
    selector: 'compose-email',
    templateUrl: 'compose-email.component.html'
})

export class ComposeEmailComponent implements OnInit {
    emailForm: FormGroup;
    isDisplayBCC: boolean;
    isSending: boolean;
    constructor(
        private fb: FormBuilder,
        private settingsService: SettingsService,
        private emailService: EmailService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
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
        this.isDisplayBCC = this.emailForm.get('cc').value.length || this.emailForm.get('bcc').value.length;
    }
    submitForm() {
        console.log(this.emailForm.value);
        this.messageService.clear();
        if (!this.emailForm.value.subject || !this.emailForm.value.text) {
            this.confirmationService.confirm({
                header: 'Confirmation',
                message: 'Send this message without a subject or text in the body?',
                accept: this.send

            });
        } else {
            this.send();
        }
    }
    // Arrow function in order to bind 'this'
    send = () => {
        this.isSending = true;
        this.emailService.sendEmail(this.emailForm.value)
            .finally(() => this.isSending = false)
            .subscribe(() => { });
    }
}
