import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/customer/category/category.service';
import { ProductService } from 'src/app/services/customer/product/product.service';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  public urlImage = AppSettings.APP_URL_IMG;
  declare categories: any;
  declare products: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);

    this.getProduct(id);

  }
  getCategory(id: number) {
    this.categoryService.getCategory(id).subscribe(
      (data: any) => {
        console.log(data);
        this.categories = data;
      }
    )
  }
  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      (data: any) => {
        console.log(data);
        this.products = data;
        this.getCategory(data.idCat);
      }
    )
  }

}
