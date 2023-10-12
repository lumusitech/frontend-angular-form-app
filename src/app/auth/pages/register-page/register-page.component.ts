import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group(
    {
      // validation at control level - not access to form and others controls
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.validatorsService.firstNameAndLastnamePattern
          ),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
        [this.emailValidator],
      ],
      username: [
        '',
        [Validators.required, this.validatorsService.cantBeStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      // validation at form level - access to form and others controls
      validators: [
        this.validatorsService.isFieldOneEqualsFieldTwo(
          'password',
          'password2'
        ),
      ],
    }
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly validatorsService: ValidatorsService,
    private readonly emailValidator: EmailValidatorService
  ) {}

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSave(): void {
    if (this.myForm.invalid) {
      return this.myForm.markAllAsTouched();
    }
    console.log(this.myForm.value);
  }
}
