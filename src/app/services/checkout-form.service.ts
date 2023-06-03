/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    const data: number[] = [];

    // build an array for dropdown list - month:
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    const data: number[] = [];

    // - start at current year and loop for next 10 years
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10

    for (let theYear = startYear; startYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
