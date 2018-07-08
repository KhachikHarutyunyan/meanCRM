import { Category } from './../../shared/interfaces';
import { MaterialService } from './../../shared/classes/material.service';
import { CategoriesServices } from './../../shared/services/categories.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  @ViewChild('input') inputRef: ElementRef;
  isNew = true;
  image: File;
  imagePreview = '';
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesServices: CategoriesServices
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable();

    this.route.params.pipe(switchMap((params: Params) => {
      if (params['id']) {
        this.isNew = false;
        return this.categoriesServices.getById(params['id']);
      }

      return of(null);
    })).subscribe(
      (category: Category) => {
        if (category) {
          this.category = category;
          this.form.patchValue({
            name: category.name
          });
          this.imagePreview = category.imageSrc;
          MaterialService.updateTextInputs();
        }
        this.form.enable();
      },
      err => MaterialService.toast(err.error.message)
    );
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFIleUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  deletCategory() {
    const decision = window.confirm(`Вы уверенны, чтр хотите удалить категорию "${this.category.name}"`);
    if (decision) {
      this.categoriesServices.delete(this.category._id).subscribe(
        response => {
          MaterialService.toast(response.message);
        },
        err => {
          MaterialService.toast(err.error.message);
        },
        () => {
          this.router.navigate(['/categories']);
        }
      );
    }
  }

  onSubmit() {
    let obs$;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.categoriesServices.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesServices.update(this.category._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
      category => {
        this.category = category;
        MaterialService.toast('Изменения сохранены');
        this.form.enable();
      },
      err => {
        MaterialService.toast(err.error.message);
        this.form.enable();
      }
    );

  }

}
