import { InstructionService } from './instruction.service';
import { Instruction } from '../shared/models/instruction.model';

describe('InstructionService', () => {
  let instructionService: InstructionService;

  beforeEach(() => {
    instructionService = new InstructionService();
  });

  it('#getInstruction should return "loading" object', () => {
    const expectedInstruction = {
      severity: 'info',
      message: 'Please wait',
    };

    expect(instructionService.getInstruction('loading')).toEqual(expectedInstruction);
  });

  it('#sendInstruction should inform subscriber', done => {
    const expectedInstruction = {
      severity: 'error',
      message: 'Please type at least 2 characters',
    };

    instructionService.sendInstruction('short term');

    instructionService.currentInstruction().subscribe((instruction: Instruction) => {
      expect(instruction).toEqual(expectedInstruction);
    });

    done();
  });
});
