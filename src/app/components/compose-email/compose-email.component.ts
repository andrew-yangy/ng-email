import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../@core/data/settings';
import {FormBuilder, FormGroup} from '@angular/forms';
import {logging} from 'selenium-webdriver';

@Component({
  selector: 'compose-email',
  templateUrl: 'compose-email.component.html',
  styleUrls: ['compose-email.component.scss']
})

export class ComposeEmailComponent implements OnInit {
  emailForm: FormGroup;
  displayBCC: boolean;

  constructor(private fb: FormBuilder,
              private settingsService: SettingsService) {
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
  hideBcc() {
    this.displayBCC = this.emailForm.get('cc').value.length || this.emailForm.get('bcc').value.length;
  }
  onSubmit() {
    console.log(this.emailForm.value);
  }
}
