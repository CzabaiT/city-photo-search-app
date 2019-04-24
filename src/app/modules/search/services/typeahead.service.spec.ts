import { TypeaheadService } from './typeahead.service';
import { Typeahead } from '../shared/models/typehead.model';

describe('TypeaheadService', () => {
  let typeaheadService: TypeaheadService;

  beforeEach(() => {
    typeaheadService = new TypeaheadService();
  });

  it('#changeTypeahead should inform subscriber', done => {
    const expectedTypeahead = {
      inputValue: 'test',
      isCitySelected: true,
    };

    typeaheadService.changeTypeahead(expectedTypeahead);

    typeaheadService.currentTypeahead().subscribe((typeahead: Typeahead) => {
      expect(typeahead).toEqual(expectedTypeahead);
    });

    done();
  });

  it('#resetTypeahead should inform subscriber', done => {
    const expectedTypeahead = {
      inputValue: '',
      isCitySelected: false,
    };

    typeaheadService.resetTypeahead();

    typeaheadService.currentTypeahead().subscribe((typeahead: Typeahead) => {
      expect(typeahead).toEqual(expectedTypeahead);
    });

    done();
  });
});
