import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Product: any = [];
  constructor(public _api: RestApiService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts()
  {
    return this._api.getProducts().subscribe((data => {
      this.Product = data;
    }))
  }

  deleteProduct(id)
  {
    this._api.deleteProduct(id).subscribe(data => {
      this.loadProducts()
    })
  }
}
