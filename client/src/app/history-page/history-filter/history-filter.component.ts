import { Component, EventEmitter, Output, ViewChild,
   ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Filter } from '../../shared/interfaces';
import { MaterialService, MaterialDatepicker } from '../../shared/classes/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  order: number;
  start: MaterialDatepicker;
  end: MaterialDatepicker;

  isValid = true;

  ngAfterViewInit() {
    this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this));
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date < this.end.date;
  }

  submitFilter() {
    const filter: Filter = {};
    if (this.order) {
      filter.order = this.order;
    }

    if (this.start.date) {
      filter.start = this.start.date;
    }

    if (this.end.date) {
      filter.end = this.end.date;
    }

    this.onFilter.emit(filter);
  }

  ngOnDestroy() {
    this.start.destroy();
    this.end.destroy();
  }

}
