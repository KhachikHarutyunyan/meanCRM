import { MaterialInstance, MaterialService } from './../shared/classes/material.service';
import { OverviewPage } from './../shared/interfaces';
import { Observable } from 'rxjs';
import { AnalyticsService } from './../shared/services/analytics.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tapTarget') tapTargetRef: ElementRef;

  data$: Observable<OverviewPage>;
  tapTarget: MaterialInstance;

  yesterday = new Date();

  constructor(
    private service: AnalyticsService
  ) { }

  ngOnInit() {
    this.data$ = this.service.getOverview();

    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.initaTapTarget(this.tapTargetRef);
  }

  openInfo() {
    this.tapTarget.open();
  }

  ngOnDestroy() {
    this.tapTarget.destroy();
  }

}
