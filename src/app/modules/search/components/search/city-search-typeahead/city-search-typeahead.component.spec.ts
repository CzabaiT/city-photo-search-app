import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CitySearchTypeaheadComponent } from './city-search-typeahead.component';
import { SearchModule } from '../../../search.module';
import { CitiesService } from '../../../services/cities.service';
import { environment } from '../../../../../../environments/environment';

function generateInputString(lessThanMinimumSearchTermLength: boolean): string {
  const baseString = 'abrakadabrakadabra';
  const minLength = environment.minimumSearchTermLength;

  return lessThanMinimumSearchTermLength
    ? baseString.substring(0, minLength - 1)
    : baseString.substring(0, minLength);
}

describe('CitySearchTypeaheadComponent', () => {
  let typeaheadComponent: CitySearchTypeaheadComponent;
  let typeaheadFixture: ComponentFixture<CitySearchTypeaheadComponent>;
  let typeaheadDebugElement: DebugElement;
  let inputElement: HTMLInputElement;
  let changeCitiesSpy: Observable<any>;

  beforeEach(async(() => {
    const citiesServiceSpy = jasmine.createSpyObj('CitiesService', ['changeCities']);
    changeCitiesSpy = citiesServiceSpy.changeCities.and.returnValue(of());

    TestBed.configureTestingModule({
      declarations: [],
      imports: [BrowserModule, FormsModule, SearchModule],
      providers: [{ provide: CitiesService, useValue: citiesServiceSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    typeaheadFixture = TestBed.createComponent(CitySearchTypeaheadComponent);
    typeaheadComponent = typeaheadFixture.componentInstance;
    typeaheadDebugElement = typeaheadFixture.debugElement;
    typeaheadFixture.detectChanges();

    inputElement = typeaheadDebugElement.query(By.css('.cps-search-typeahead-input')).nativeElement;
  });

  it('#onInputChanged should handle input below minimumSearchTermLength', () => {
    const inputString = generateInputString(true);
    inputElement.value = inputString;
    inputElement.dispatchEvent(new Event('input'));

    expect(typeaheadComponent.searchTerm).toBe(inputString, 'searchTerm not correct');
    expect(typeaheadComponent.isResultVisible).toBe(false, 'isVisible not correct');
    expect(changeCitiesSpy).toHaveBeenCalledTimes(0);
  });

  it('#onInputChanged should handle input equal or greater than minimumSearchTermLength', () => {
    const inputString = generateInputString(false);
    inputElement.value = inputString;
    inputElement.dispatchEvent(new Event('input'));

    expect(typeaheadComponent.searchTerm).toBe(inputString, 'searchTerm not correct');
    expect(typeaheadComponent.isResultVisible).toBe(true, 'isVisible not correct');
    expect(changeCitiesSpy).toHaveBeenCalledWith(inputString);
  });
});
