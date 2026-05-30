import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, TagModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getOne(+id).subscribe(product => {
        this.product = product;
        this.cdr.detectChanges();
      });
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}