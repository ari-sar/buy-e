import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let formBuilder: FormBuilder;
  let alertService: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AlertService, useValue: { presentAlert: jasmine.createSpy('presentAlert') } }
      ]
    });

    formBuilder = TestBed.inject(FormBuilder);
    alertService = TestBed.inject(AlertService);
    component = new ProfileComponent(formBuilder, alertService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with correct initial values', () => {
    expect(component.userForm).toBeDefined();
    expect(component.userForm.get('displayName')).toBeTruthy();
    expect(component.userForm.get('firstName')).toBeTruthy();
    expect(component.userForm.get('lastName')).toBeTruthy();
    expect(component.userForm.get('aboutYourself')).toBeTruthy();
    expect(component.userForm.get('areaOfInterest')).toBeTruthy();
    expect(component.userForm.get('studentOrProfessional')).toBeTruthy();
    expect(component.userForm.get('experience')).toBeTruthy();
    expect(component.userForm.get('expertise')).toBeTruthy();
    expect(component.userForm.get('role')).toBeTruthy();
  });

  it('should show alert on form submission', () => {
    component.onSubmit();
    expect(alertService.presentAlert).toHaveBeenCalledWith('Success', 'Your profile is updated');
  });
});
