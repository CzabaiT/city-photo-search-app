import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CitySearchResultsOverlayComponent } from './city-search-results-overlay.component';

describe('CitySearchResultsOverlayComponent', () => {
  let component: CitySearchResultsOverlayComponent;
  let fixture: ComponentFixture<CitySearchResultsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CitySearchResultsOverlayComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchResultsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
