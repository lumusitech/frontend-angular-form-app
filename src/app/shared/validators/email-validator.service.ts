import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  public validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    const email = control.value;

    // In real app, we should implement server-side validation using http request

    // mock response
    const httpCallObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        console.log(email);

        if (email === 'lu@email.com') {
          subscriber.next({ emailTaken: true });
          subscriber.complete();
        }

        subscriber.next(null);
        subscriber.complete();
      }
    ).pipe(delay(2000)); // simulate server-side validation delay

    return httpCallObservable;
  };
}
