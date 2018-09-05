import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { APIService} from '../services/api.service';

@Injectable()
export class APIResolver implements Resolve<Observable<string>> {
  constructor(private apiService: APIService) {}

  resolve() {
    return this.apiService.init();
  }
}