import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { SearchModule } from '../../search.module';

describe('SearchComponent', () => {
  let searchFixture: ComponentFixture<SearchComponent>;
  let compiledSearch: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [SearchModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    searchFixture = TestBed.createComponent(SearchComponent);
    searchFixture.detectChanges();
    compiledSearch = searchFixture.debugElement.nativeElement;
  });

  it('should render search-instruction container', () => {
    expect(compiledSearch.querySelector('.cps-city-status-bar-container')).toBeTruthy();
  });

  it('should render city-search-typehead container', () => {
    expect(compiledSearch.querySelector('.cps-search-typeahead-container')).toBeTruthy();
  });

  it('should render photo-search-button container', () => {
    expect(compiledSearch.querySelector('.cps-search-button-container')).toBeTruthy();
  });
});
