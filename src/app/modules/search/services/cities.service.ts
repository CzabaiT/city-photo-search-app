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
  currentCities = this.citiesSource.asObservable();

  private storedCities: City[];

  constructor(private http: HttpClient, private instructionService: InstructionService) {
    this.storedCities = JSON.parse(localStorage.getItem('cities')) || [];
  }

  changeCities(searchTerm: string): void {
    let params = new HttpParams();
    params = params.append('searchTerm', searchTerm);

    this.instructionService.sendInstruction('loading');

    this.http.get(environment.apiUrl + '/citysearch', { params }).subscribe(
      (cities: City[]) => {
        this.citiesSource.next(cities);
        this.instructionService.cleanInstruction();
      },
      error => alert(error.message || 'Oops something went wrong')
    );
  }
}
