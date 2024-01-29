import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.userForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      aboutYourself: ['', Validators.maxLength(100)],
      areaOfInterest: [[]],
      studentOrProfessional: [''],
      experience: [''],
      expertise: [''],
      role: ['', Validators.maxLength(200)]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.alertService.presentAlert('Success', 'Your profile is updated')
  }

}
