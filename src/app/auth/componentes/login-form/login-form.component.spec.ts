import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Credentials } from '../../models';
import { LoginFormComponent } from './login-form.component';

describe('Login Page', () => {
  let fixture: ComponentFixture<LoginFormComponent>;
  let instance: LoginFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(LoginFormComponent);
    instance = fixture.componentInstance;
  });

  it('should compile', () => {
    fixture.detectChanges();

    (<any>expect(fixture)).toMatchSnapshot();
  });

  it('should disable the form if pending', () => {
    instance.pending = true;

    fixture.detectChanges();

    (<any>expect(fixture)).toMatchSnapshot();
  });

  it('should emit an event if the form is valid when submitted', () => {
    const credentials: Credentials = {
      email: 'user@email.com',
      password: 'password',
    };
    instance.form.setValue(credentials);

    spyOn(instance.submitted, 'emit');
    instance.submit();

    expect(instance.submitted.emit).toHaveBeenCalledWith(credentials);
  });
});
