import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TypeaheadService } from '../../../../services/typeahead.service';
import { CitiesService } from '../../../../services/cities.service';
import { SearchStatus } from '../../../../shared/enums/search-status.enum';
import { City } from '../../../../shared/models/city.model';

@Component({
  selector: 'cps-city-search-results-overlay',
  templateUrl: './city-search-results-overlay.component.html',
  styleUrls: ['./city-search-results-overlay.component.scss'],
})
export class CitySearchResultsOverlayComponent implements OnInit, OnDestroy {
  citiesSubscription: Subscription;
  cities: City[] = [];
  searchStatusEnum = SearchStatus;
  searchStatus: SearchStatus = SearchStatus.BeforeSearch;

  constructor(private citiesService: CitiesService, private typeaheadService: TypeaheadService) {}

  ngOnInit() {
    this.citiesSubscription = this.citiesService.currentCities.subscribe((result: City[]) => {
      this.cities = result;
      this.searchStatus = result.length > 0 ? SearchStatus.Found : SearchStatus.NotFound;
    });
  }

  onCitySelected(cityName: string) {
    this.typeaheadService.changeTypeahead({
      inputValue: cityName,
      isCitySelected: true,
    });
    this.searchStatus = SearchStatus.BeforeSearch;
  }

  ngOnDestroy() {
    this.citiesSubscription.unsubscribe();
  }
}
