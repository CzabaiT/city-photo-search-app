import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySearchTypeaheadComponent } from './city-search-typeahead.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SearchModule } from '../../../search.module';

describe('CitySearchTypeaheadComponent', () => {
  let component: CitySearchTypeaheadComponent;
  let fixture: ComponentFixture<CitySearchTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [BrowserModule, FormsModule, SearchModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
