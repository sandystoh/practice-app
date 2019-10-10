import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, flatMap, toArray } from 'rxjs/operators';
import { City } from '../models/city';

export const DBHOST = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getWeatherById(id: string): Promise<any> {
    const params = new HttpParams()
    .set('id', id)
    .set('appid', environment.api_key);

    return this.http.get(environment.api_url, {params}).toPromise();
  }

  getCities(): Promise<any> {
    return(
      this.http.get<City[]>(DBHOST + 'cities').toPromise()
    );
  }

  getRecordByProperty(property: string, cityNum: string): Promise<City> {
    return(
      this.http.get<City>(DBHOST + 'cities?' + property + '=' + cityNum).toPromise()
    );
  }

  getCityList(): Promise<any> {
    // return this.http.get('./assets/data/citylist.json').toPromise();
    return(
      this.http.get<any>('./assets/data/citylist.json')
    .pipe(
        map(v => v.cities),
        flatMap(v => v),
        map((v: any) => {
            return ({ cityNum: v.id, name: v.name, country: v.country } as City);
        }),
        toArray()
    )
    .toPromise()
    );
  }

}
