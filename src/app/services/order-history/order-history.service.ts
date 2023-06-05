import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from 'src/app/common/order-history/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = 'http://localhost:8080/api/orders';

  constructor( private httpClient: HttpClient ) { }

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {

    // build the URL based on the customer email
    const orderHistoryUrl = `${this.orderUrl}/search/findCustomerByEmail?email=${theEmail}`

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);

  }
}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  }
}