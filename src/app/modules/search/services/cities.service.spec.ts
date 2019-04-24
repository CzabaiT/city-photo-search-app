import { defer } from 'rxjs';
import { CitiesService } from './cities.service';
import { InstructionService } from './instruction.service';
import { City } from '../shared/models/city.model';

const expectedCities: City[] = [
  { country: 'ES', name: 'Fuentestrún', lat: '41.87466', lng: '-2.08283' },
  { country: 'NO', name: 'Prestestranda', lat: '59.09773', lng: '9.05866' },
];

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('CitiesService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let instructionServiceSpy: InstructionService;
  let citiesService: CitiesService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    instructionServiceSpy = jasmine.createSpyObj('InstructionService', [
      'sendInstruction',
      'cleanInstruction',
    ]);
    citiesService = new CitiesService(<any>httpClientSpy, <any>instructionServiceSpy);
  });

  it('#getCities should return expected Cities', async () => {
    httpClientSpy.get.and.returnValue(asyncData(expectedCities));

    citiesService.getCities('testr').then(resp => expect(resp).toEqual(expectedCities), fail);
  });

  it('#changeCities response should inform subscriber', async () => {
    httpClientSpy.get.and.returnValue(asyncData(expectedCities));

    await citiesService.changeCities('testr');

    citiesService.currentCities().subscribe((cities: City[]) => {
      expect(cities).toEqual(expectedCities);
    }, fail);
  });

  it('#changeCities should render alert with received error message', async () => {
    const error = { statusCode: 400, message: 'Provide searchTerm in query string' };
    httpClientSpy.get.and.returnValue(asyncError(error));

    spyOn(window, 'alert');

    await citiesService.changeCities('');

    expect(window.alert).toHaveBeenCalledWith(error.message);
  });

  it('#changeCities should render alert with default error message', async () => {
    const error = { statusCode: 400 };
    httpClientSpy.get.and.returnValue(asyncError(error));

    spyOn(window, 'alert');

    await citiesService.changeCities('');

    expect(window.alert).toHaveBeenCalledWith('Oops something went wrong');
  });
});
