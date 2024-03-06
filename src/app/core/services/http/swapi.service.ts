import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { PersonModel } from '../../../models/person.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StarshipModel } from '../../../models/starship.model';
import { StarshipDtoModel } from '../../../models/starship-dto.model';
import { PersonDtoModel } from '../../../models/person-dto.model';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private url: string = "https://www.swapi.tech/api";
  private totalPeopleNumber = 82; // The total number of people available in the API.
  private totalStarshipNumber = 36; // The total number of starships available in the API.
  constructor(private http: HttpClient) { }

  getPerson(retryCount = 0): Observable<PersonModel> {
    const randomId = Math.floor(Math.random() * this.totalPeopleNumber) + 1;
    return this.http.get<PersonDtoModel>(`${this.url}/people/${randomId}`).pipe(
      map(data => this.mapPersonDtoToPersonModel(data)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 && retryCount < 100) {
          return this.getPerson(retryCount + 1);
        }
        return throwError(() => error);
      })
      );
  }

  getStarships(retryCount = 0): Observable<StarshipModel> {
    const totalStarshipNumber = Math.floor(Math.random() * this.totalStarshipNumber) + 1;
    return this.http.get<StarshipDtoModel>(`${this.url}/starships/${totalStarshipNumber}`).pipe(
      map(data => this.mapStarshipDtoToStarshipModel(data)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 && retryCount < 100) {
          return this.getStarships(retryCount + 1);
        }
        return throwError(() => error);
      })
    );
  }

  private mapPersonDtoToPersonModel(data: PersonDtoModel): PersonModel{
    return {
      height: data.result.properties.height,
      mass: isNaN(Number(data.result.properties.mass)) ? null : Number(data.result.properties.mass),
      hairColor: data.result.properties.hair_color,
      skinColor: data.result.properties.skin_color,
      eyeColor: data.result.properties.eye_color,
      birthYear: data.result.properties.birth_year,
      gender: data.result.properties.gender,
      created: data.result.properties.created ? new Date(data.result.properties.created).toISOString().slice(0, 10) : "",
      edited: data.result.properties.edited  ? new Date(data.result.properties.edited).toISOString().slice(0, 10) : "",
      name: data.result.properties.name,
      description: data.result.description
    }
  }

  private mapStarshipDtoToStarshipModel(data: StarshipDtoModel): StarshipModel {
      return {
      model: data.result.properties.model,
      crew: isNaN(Number(data.result.properties.crew)) ? null : Number(data.result.properties.crew),
      starshipClass: data.result.properties.starship_class,
      manufacturer: data.result.properties.manufacturer,
      costInCredits: data.result.properties.cost_in_credits,
      length: data.result.properties.length,
      passengers: data.result.properties.passengers,
      maxAtmospheringSpeed: data.result.properties.max_atmosphering_speed,
      hyperdriveRating: data.result.properties.hyperdrive_rating,
      mglt: data.result.properties.MGLT,
      cargoCapacity: data.result.properties.cargo_capacity,
      created: data.result.properties.created ? new Date(data.result.properties.created).toISOString().slice(0, 10) : "",
      edited: data.result.properties.edited ? new Date(data.result.properties.edited).toISOString().slice(0, 10) : "",
      description: data.result.description
    }
  }
}
