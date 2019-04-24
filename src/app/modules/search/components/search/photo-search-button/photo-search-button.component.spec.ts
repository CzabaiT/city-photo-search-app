import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { PhotoSearchButtonComponent } from './photo-search-button.component';
import { InstructionService } from '../../../services/instruction.service';

describe('PhotoSearchButtonComponent', () => {
  let buttonComponent: PhotoSearchButtonComponent;
  let buttonFixture: ComponentFixture<PhotoSearchButtonComponent>;
  let sendInstructionSpy: Observable<any>;

  beforeEach(async () => {
    const instructionServiceSpy = jasmine.createSpyObj('InstructionService', ['sendInstruction']);
    sendInstructionSpy = instructionServiceSpy.sendInstruction.and.returnValue(of());

    TestBed.configureTestingModule({
      declarations: [PhotoSearchButtonComponent],
      providers: [{ provide: InstructionService, useValue: instructionServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    buttonFixture = TestBed.createComponent(PhotoSearchButtonComponent);
    buttonComponent = buttonFixture.componentInstance;
    buttonFixture.detectChanges();
  });

  it('#onClick should open a search in a blank page', async () => {
    buttonComponent.typeahead = {
      inputValue: 'Los Caminos',
      isCitySelected: true,
    };

    spyOn(window, 'open');

    await buttonComponent.onClick();

    expect(window.open).toHaveBeenCalledWith(
      'https://www.google.com/search?q=Los Caminos&tbm=isch',
      '_blank'
    );
  });

  it('#onClick should call instructionService with "not selected"', () => {
    buttonComponent.typeahead = {
      inputValue: 'stadum',
      isCitySelected: false,
    };

    buttonComponent.onClick();

    expect(sendInstructionSpy).toHaveBeenCalledWith('not selected');
  });

  it('#onClick should call instructionService with "short term"', () => {
    buttonComponent.typeahead = {
      inputValue: 'z',
      isCitySelected: false,
    };

    buttonComponent.onClick();

    expect(sendInstructionSpy).toHaveBeenCalledWith('short term');
  });
});
