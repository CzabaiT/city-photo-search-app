import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Instruction } from '../shared/models/instruction.model';

@Injectable({
  providedIn: 'root',
})
export class InstructionService {
  private instructions = {
    default: {
      severity: 'notice',
      message: 'Which city are you looking for?',
    },
    loading: {
      severity: 'info',
      message: 'Please wait',
    },
    'short term': {
      severity: 'error',
      message: 'Please type at least 2 characters',
    },
    'not selected': {
      severity: 'error',
      message: 'Please select a city from the list',
    },
  };
  private instructionSource = new BehaviorSubject<Instruction>(this.getInstruction('default'));
  currentInstruction = this.instructionSource.asObservable();

  constructor() {}

  getInstruction(instructionName: string): Instruction {
    return this.instructions[instructionName];
  }

  sendInstruction(instructionName: string) {
    this.instructionSource.next(this.getInstruction(instructionName));
  }

  cleanInstruction() {
    this.instructionSource.next(this.getInstruction('default'));
  }
}
