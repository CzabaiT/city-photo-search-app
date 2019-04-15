import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CitiesService } from '../../../services/cities.service';
import { TypeaheadService } from '../../../services/typeahead.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'cps-city-search-typeahead',
  templateUrl: './city-search-typeahead.component.html',
  styleUrls: ['./city-search-typeahead.component.scss'],
})
export class CitySearchTypeaheadComponent implements OnInit, OnDestroy {
  @ViewChild('typeaheadInput') typeaheadInput: ElementRef;
  typeahead: Subscription;
  MINIMUM_SEARCH_TERM_LENGTH = environment.minimumSearchTermLength;
  isResultVisible: boolean;
  searchTerm = '';

  constructor(private citiesService: CitiesService, private typeaheadService: TypeaheadService) {}

  ngOnInit() {
    this.typeahead = this.typeaheadService.currentTypeahead.subscribe(typeahead => {
      this.searchTerm = typeahead.inputValue;
      this.setFocus(this.typeaheadInput);
    });
  }

  onInputChanged(event: any) {
    this.searchTerm = event.target.value;
    this.isResultVisible = this.searchTerm.length >= this.MINIMUM_SEARCH_TERM_LENGTH ? true : false;

    this.typeaheadService.changeTypeahead({
      inputValue: this.searchTerm,
      isCitySelected: false,
    });

    if (this.searchTerm.length >= this.MINIMUM_SEARCH_TERM_LENGTH) {
      this.citiesService.changeCities(this.searchTerm);
    }
  }

  setFocus(el: ElementRef) {
    el.nativeElement.focus();
  }

  ngOnDestroy() {
    this.typeahead.unsubscribe();
  }
}
