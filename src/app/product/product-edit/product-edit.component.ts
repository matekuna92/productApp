import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id = this._actRoute.snapshot.params['id'];
  productDetails: any = {};

  constructor(public _api: RestApiService,
              public _actRoute: ActivatedRoute,
              public _router: Router) { }

  ngOnInit() {
    this._api.getProduct(this.id).subscribe((data: {}) => {
      this.productDetails = data;
    })
  }

  updateProduct()
  {
    this._api.updateProduct(this.id, this.productDetails).subscribe(data => {
      this._router.navigate(['/list-product'])
    })
  }


}
