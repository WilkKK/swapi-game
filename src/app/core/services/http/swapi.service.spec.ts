import { TestBed } from '@angular/core/testing';
import { SwapiService } from './swapi.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SwapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correct map person response', () => {
    const mockResponse = {
      result: {
        properties: {
          height: "172",
          mass: "77",
          hair_color: "blond",
          skin_color: "fair",
          eye_color: "blue",
          birth_year: "19BBY",
          gender: "male",
          created: "2014-12-09T13:50:51.644000Z",
          edited: "2014-12-20T21:17:56.891000Z",
          name: "Luke Skywalker"
        },
        description: "A person"
      }
    };
  
    service.getPerson().subscribe(person => {
      expect(person.name).toEqual("Luke Skywalker");
      expect(person.mass).toEqual(77);
      expect(person.height).toEqual("172");
      expect(person.hairColor).toEqual("blond");
      expect(person.skinColor).toEqual("fair");
      expect(person.eyeColor).toEqual("blue");
      expect(person.birthYear).toEqual("19BBY");
      expect(person.gender).toEqual("male");
      expect(person.created).toEqual("2014-12-09T13:50:51.644000Z");
      expect(person.edited).toEqual("2014-12-20T21:17:56.891000Z");
      expect(person.description).toEqual("A person");
    });
  
    const req = httpMock.expectOne(request => request.url.includes('/people/'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should correct map starship response', () => {
    const mockResponse = {
      result: {
        properties: {
          model: "YT-1300 light freighter",
          crew: "4",
          starship_class: "Light freighter",
          manufacturer: "Corellian Engineering Corporation",
          cost_in_credits: "100000",
          length: "34.37",
          passengers: "6",
          max_atmosphering_speed: "1050",
          hyperdrive_rating: "0.5",
          MGLT: "75",
          cargo_capacity: "100000",
          created: "2014-12-10T16:59:45.094000Z",
          edited: "2014-12-20T21:23:49.880000Z",
        },
        description: "A starship"
      }
    };
  
    service.getStarships().subscribe(starship => {
      expect(starship.model).toEqual("YT-1300 light freighter");
      expect(starship.crew).toEqual(4);
      expect(starship.starshipClass).toEqual("Light freighter");
      expect(starship.manufacturer).toEqual("Corellian Engineering Corporation");
      expect(starship.costInCredits).toEqual("100000");
      expect(starship.length).toEqual("34.37");
      expect(starship.passengers).toEqual("6");
      expect(starship.maxAtmospheringSpeed).toEqual("1050");
      expect(starship.hyperdriveRating).toEqual("0.5");
      expect(starship.mglt).toEqual("75");
      expect(starship.cargoCapacity).toEqual("100000");
      expect(starship.created).toEqual("2014-12-10T16:59:45.094000Z");
      expect(starship.edited).toEqual("2014-12-20T21:23:49.880000Z");
      expect(starship.description).toEqual("A starship");

    });
  
    const req = httpMock.expectOne(request => request.url.includes('/starships/'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

});
