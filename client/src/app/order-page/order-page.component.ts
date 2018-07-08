import { OrderService } from './../shared/services/order.service';
import { MaterialService, MaterialInstance } from './../shared/classes/material.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';

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

  constructor(
    private router: Router,
    private orderService: OrderService
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
    this.modal.close();
  }

  ngOnDestroy() {
    this.modal.destroy();
  }


  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

}
