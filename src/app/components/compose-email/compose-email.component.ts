import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../@core/data/settings';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ContactService} from '../../@core/service/contact.service';
import {User} from '../../@core/model';

@Component({
  selector: 'compose-email',
  templateUrl: 'compose-email.component.html',
  styleUrls: ['compose-email.component.scss']
})

export class ComposeEmailComponent implements OnInit {
  emailForm: FormGroup;
  displayCC: boolean;
  displayBCC: boolean;

  constructor(private fb: FormBuilder,
              private settingsService: SettingsService,
              private contactService: ContactService) {
  }

  ngOnInit() {
    this.emailForm = this.fb.group({
      from: this.fb.group(this.settingsService.user),
      to: [[]],
      cc: [[]],
      bcc: [[]],
      subject: [''],
      text: ['']
    });
  }

  matchedContacts = () => {
    return this.contactService.getContacts();
  }

  matchingfn(value: string, target: User) {
    return target.name.toLowerCase().includes(value.toLowerCase()) || target.email.toLowerCase().includes(value.toLowerCase());
  }

  onSubmit() {
    console.log(this.emailForm.value);
  }
}
