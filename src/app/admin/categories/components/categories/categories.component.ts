import { Component, OnInit } from '@angular/core';

import { CategoriesService } from './../../../../core/services/categories.service';
import { Category } from './../../../../core/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categoriesService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
    });
  }

  deleteCategory(category: Category) {
    console.log("Categoria a eliminar:", category);
    if (category._id) { // Cambiar _id por id si ese es el nombre correcto
      this.categoriesService.deleteCategory(category._id.toString()).subscribe(rta => { // Convert _id to string
        this.getCategories();
      }, error => {
        console.error("Error al eliminar la categoría:", error);
      });
    } else {
      console.error("No se encontró ID válido en la categoría:", category);
    }
  }

}
