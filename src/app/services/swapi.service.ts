import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { PersonModel } from '../models/person.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StarshipModel } from '../models/starship.model';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private url: string = "https://www.swapi.tech/api"
  constructor(private http: HttpClient) { }

  getPerson(retryCount = 0): Observable<PersonModel> {
    const id = Math.floor(Math.random() * 82) + 1;
    return this.http.get<any>(`${this.url}/people/${id}`).pipe(
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
    const id = Math.floor(Math.random() * 36) + 1;
    return this.http.get<any>(`${this.url}/starships/${id}`).pipe(
      map(data => this.mapStarshipDtoToStarshipModel(data)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 && retryCount < 100) {
          return this.getStarships(retryCount + 1);
        }
        return throwError(() => error);
      })
    );
  }

  private mapPersonDtoToPersonModel(data: any): PersonModel{
    return {
      height: data.result.properties.height,
      mass: isNaN(Number(data.result.properties.mass)) ? null : Number(data.result.properties.mass),
      hairColor: data.result.properties.hair_color,
      skinColor: data.result.properties.skin_color,
      eyeColor: data.result.properties.eye_color,
      birthYear: data.result.properties.birth_year,
      gender: data.result.properties.gender,
      created: data.result.properties.created,
      edited: data.result.properties.edited,
      name: data.result.properties.name,
      description: data.result.description
    } as any
  }

  private mapStarshipDtoToStarshipModel(data: any): StarshipModel {
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
      created: data.result.properties.created,
      edited: data.result.properties.edited,
      description: data.result.description
    }
  }
}
