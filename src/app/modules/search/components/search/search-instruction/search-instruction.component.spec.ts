import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInstructionComponent } from './search-instruction.component';

describe('SearchInstructionComponent', () => {
  let instructionComponent: SearchInstructionComponent;
  let instructionFixture: ComponentFixture<SearchInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInstructionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    instructionFixture = TestBed.createComponent(SearchInstructionComponent);
    instructionComponent = instructionFixture.componentInstance;
    instructionFixture.detectChanges();
  });

  it('should create the component', () => {
    expect(instructionComponent).toBeTruthy();
  });
});
