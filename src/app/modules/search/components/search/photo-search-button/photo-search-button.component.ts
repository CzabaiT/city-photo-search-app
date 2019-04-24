import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { InstructionService } from '../../../services/instruction.service';
import { TypeaheadService } from '../../../services/typeahead.service';
import { Typeahead } from '../../../shared/models/typehead.model';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'cps-photo-search-button',
  templateUrl: './photo-search-button.component.html',
  styleUrls: ['./photo-search-button.component.scss'],
})
export class PhotoSearchButtonComponent implements OnInit, OnDestroy {
  MINIMUM_SEARCH_TERM_LENGTH = environment.minimumSearchTermLength;
  typeaheadSubscription: Subscription;
  typeahead: Typeahead;

  constructor(
    private typeaheadService: TypeaheadService,
    private instructionService: InstructionService
  ) {}

  ngOnInit() {
    this.typeaheadSubscription = this.typeaheadService
      .currentTypeahead()
      .subscribe(typeahead => (this.typeahead = typeahead));
  }

  onClick() {
    if (this.typeahead.isCitySelected) {
      window.open(
        `https://www.google.com/search?q=${this.typeahead.inputValue}&tbm=isch`,
        '_blank'
      );
      this.typeaheadService.resetTypeahead();
    } else if (this.typeahead.inputValue.length >= this.MINIMUM_SEARCH_TERM_LENGTH) {
      this.instructionService.sendInstruction('not selected');
    } else {
      this.instructionService.sendInstruction('short term');
    }
  }

  ngOnDestroy() {
    this.typeaheadSubscription.unsubscribe();
  }
}
