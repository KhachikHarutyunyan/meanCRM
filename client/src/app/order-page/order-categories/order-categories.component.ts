import { Observable } from 'rxjs';
import { CategoriesServices } from './../../shared/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/interfaces';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(
    private categoriesService: CategoriesServices
  ) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }

}
