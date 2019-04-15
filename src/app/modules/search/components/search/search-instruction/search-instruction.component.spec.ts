import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInstructionComponent } from './search-instruction.component';

describe('SearchInstructionComponent', () => {
  let component: SearchInstructionComponent;
  let fixture: ComponentFixture<SearchInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInstructionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
