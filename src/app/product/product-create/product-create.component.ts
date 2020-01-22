import { Component, OnInit, Input } from '@angular/core';
import { RestApiService } from '../../shared/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  @Input() productDetails = { id: 0, name: '', description: '', price: 0, imageUrl: '', quantity: 0 }


  constructor(public _api: RestApiService, 
              public _router: Router) { }

  ngOnInit() {
  }

  addProduct(dataProduct) 
    {
      this._api.createProduct(this.productDetails).subscribe((data: {}) => {
        this._router.navigate(['/list-product'])
      })
    }

}
