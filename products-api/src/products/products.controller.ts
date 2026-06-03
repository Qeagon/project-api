import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { Paginate, Paginated } from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products', description: 'Returns a paginated list of all products. Supports sorting and searching.' })
  @ApiResponse({ status: 200, description: 'List of products returned successfully.' })
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Product>> {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single product', description: 'Returns a single product by ID.' })
  @ApiParam({ name: 'id', description: 'The ID of the product' })
  @ApiResponse({ status: 200, description: 'Product returned successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create product', description: 'Creates a new product.' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productsService.create(product);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product', description: 'Updates an existing product by ID.' })
  @ApiParam({ name: 'id', description: 'The ID of the product to update' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(@Param('id') id: string, @Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.update(+id, product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product', description: 'Deletes a product by ID.' })
  @ApiParam({ name: 'id', description: 'The ID of the product to delete' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}