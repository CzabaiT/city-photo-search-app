import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { InstructionService } from './instruction.service';
import { City } from '../shared/models/city.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private citiesSource = new BehaviorSubject<City[]>([]);

  constructor(private http: HttpClient, private instructionService: InstructionService) {}

  currentCities() {
    return this.citiesSource.asObservable();
  }

  getCities(searchTerm: string): Promise<any> {
    let params = new HttpParams();
    params = params.append('searchTerm', searchTerm);
    return this.http.get(environment.apiUrl + '/citysearch', { params }).toPromise();
  }

  changeCities(searchTerm: string): Promise<any> {
    this.instructionService.sendInstruction('loading');

    return this.getCities(searchTerm)
      .then((cities: City[]) => {
        this.citiesSource.next(cities);
        this.instructionService.cleanInstruction();
      })
      .catch(error => {
        this.instructionService.cleanInstruction();
        alert(error.message || 'Oops something went wrong');
      });
  }
}
