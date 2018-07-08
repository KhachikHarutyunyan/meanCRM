import { Observable } from 'rxjs';
import { Category } from './../shared/interfaces';
import { CategoriesServices } from './../shared/services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {


  categories$: Observable<Category[]>;

  constructor(
    private categoriesServices: CategoriesServices
  ) { }

  ngOnInit() {
    this.categories$ = this.categoriesServices.fetch();
  }

}
