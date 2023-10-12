import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider')
      return {
        nonStrider: true,
      };

    return null;
  };

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isFieldOneEqualsFieldTwo = (fieldOne: string, fieldTwo: string) => {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(fieldOne)?.value || '';
      const fieldValue2 = formGroup.get(fieldTwo)?.value || '';

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(fieldTwo)?.setErrors({ notEquals: true });
        return { notEquals: true };
      }

      formGroup.get(fieldTwo)?.setErrors(null);

      return null;
    };
  };
}
