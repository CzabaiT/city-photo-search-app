import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { InstructionService } from '../../../services/instruction.service';
import { Instruction } from '../../../shared/models/instruction.model';
import { TypeaheadService } from '../../../services/typeahead.service';

@Component({
  selector: 'cps-search-instruction',
  templateUrl: './search-instruction.component.html',
  styleUrls: ['./search-instruction.component.scss'],
})
export class SearchInstructionComponent implements OnInit, OnDestroy {
  instructionSubscription: Subscription;
  typeaheadSubscription: Subscription;
  severity: string;
  message: string;

  constructor(
    private instructionService: InstructionService,
    private typeaheadService: TypeaheadService
  ) {}

  ngOnInit() {
    this.instructionSubscription = this.instructionService.currentInstruction.subscribe(
      (instruction: Instruction) => {
        this.severity = instruction.severity;
        this.message = instruction.message;
      }
    );
    this.typeaheadSubscription = this.typeaheadService.currentTypeahead.subscribe(typeahead =>
      this.instructionService.cleanInstruction()
    );
  }

  ngOnDestroy() {
    this.instructionSubscription.unsubscribe();
  }
}
