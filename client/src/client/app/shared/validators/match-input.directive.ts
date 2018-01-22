
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function matchInputValidator(input: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    return input != control.value ? {'matchInput': {}} : null;
  };
}

@Directive({
  selector: '[matchInput]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchInputValidatorDirective, multi: true}]
})
export class MatchInputValidatorDirective implements Validator {
  @Input() matchInput: string;

  validate(control: AbstractControl): {[key: string]: any} {
    return this.matchInput ? matchInputValidator(this.matchInput)(control) : null;
  }
}
