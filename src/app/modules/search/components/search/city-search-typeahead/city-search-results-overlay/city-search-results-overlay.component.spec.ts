import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { CitySearchResultsOverlayComponent } from './city-search-results-overlay.component';
import { SearchStatus } from '../../../../shared/enums/search-status.enum';
import { CitiesService } from '../../../../services/cities.service';

describe('CitySearchResultsOverlayComponent', () => {
  let overlayComponent: CitySearchResultsOverlayComponent;
  let overlayFixture: ComponentFixture<CitySearchResultsOverlayComponent>;
  let citiesServiceSpy: jasmine.SpyObj<CitiesService>;

  beforeEach(async(() => {
    citiesServiceSpy = jasmine.createSpyObj('CitiesService', ['currentCities']);

    TestBed.configureTestingModule({
      declarations: [CitySearchResultsOverlayComponent],
      imports: [HttpClientModule],
      providers: [{ provide: CitiesService, useValue: citiesServiceSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    overlayFixture = TestBed.createComponent(CitySearchResultsOverlayComponent);
    overlayComponent = overlayFixture.componentInstance;
  });

  it('should have correct searchStatus flow with #onCitySelected', () => {
    const providedCities = [];
    const currentCitiesSpy = citiesServiceSpy.currentCities.and.returnValue(of(providedCities));

    expect(overlayComponent.searchStatus).toBe(
      SearchStatus.BeforeSearch,
      'SearchStatus wrong before OnInit'
    );

    overlayFixture.detectChanges();

    expect(overlayComponent.searchStatus).toBe(
      SearchStatus.NotFound,
      'SearchStatus wrong after OnInit'
    );

    overlayComponent.onCitySelected('Salsacate');

    expect(overlayComponent.searchStatus).toBe(
      SearchStatus.BeforeSearch,
      'SearchStatus wrong after onCitySelected'
    );
  });

  it('should have correct searchStatus after subscription had received cities', () => {
    const providedCities = [
      {
        country: 'ID',
        name: 'Padalarang',
        lat: '-6.83778',
        lng: '107.47278',
      },
      { country: 'TR', name: 'Adalar', lat: '40.86778', lng: '29.13306' },
    ];
    const currentCitiesSpy = citiesServiceSpy.currentCities.and.returnValue(of(providedCities));

    overlayFixture.detectChanges();

    expect(overlayComponent.searchStatus).toBe(
      SearchStatus.Found,
      'SearchStatus wrong with provided cities'
    );
  });
});
