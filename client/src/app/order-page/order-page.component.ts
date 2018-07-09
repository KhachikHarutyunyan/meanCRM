import { OrderService } from './order.service';
import { MaterialService, MaterialInstance } from './../shared/classes/material.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { OrderPosition, Order } from '../shared/interfaces';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  isRoot: boolean;
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  pending = false;
  oSub: Subscription;

  constructor(
    private router: Router,
    public order: OrderService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  open() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.pending = true;
    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id;
        return item;
      })
    };
    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ N${newOrder.order} был добавлен.`);
        this.order.clear();
      },
      err => MaterialService.toast(err.error.message),
      () => {
        this.pending = false;
        this.modal.close();
      }
    );
  }

  deletePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition);
  }

  ngOnDestroy() {
    this.modal.destroy();
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }


  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

}
