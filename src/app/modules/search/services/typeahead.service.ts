import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Typeahead } from '../shared/models/typehead.model';

@Injectable({
  providedIn: 'root',
})
export class TypeaheadService {
  private typeaheadSource = new BehaviorSubject<Typeahead>({
    inputValue: '',
    isCitySelected: false,
  });
  currentTypeahead = this.typeaheadSource.asObservable();

  constructor() {}

  changeTypeahead(typeahead: Typeahead) {
    this.typeaheadSource.next(typeahead);
  }

  resetTypeahead() {
    this.typeaheadSource.next({
      inputValue: '',
      isCitySelected: false,
    });
  }
}
