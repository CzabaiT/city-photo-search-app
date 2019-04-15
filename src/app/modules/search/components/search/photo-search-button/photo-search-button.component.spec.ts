import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSearchButtonComponent } from './photo-search-button.component';

describe('PhotoSearchButtonComponent', () => {
  let component: PhotoSearchButtonComponent;
  let fixture: ComponentFixture<PhotoSearchButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoSearchButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoSearchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
