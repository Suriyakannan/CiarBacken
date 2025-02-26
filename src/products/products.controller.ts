import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  private products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 }
  ];

  @Get()
  getAllProducts() {
    return this.products;
  }

  @Post()
  addProduct(@Body() body: { name: string; price: number }) {
    const newProduct = { id: this.products.length + 1, ...body };
    this.products.push(newProduct);
    return newProduct;
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    const product = this.products.find(p => p.id === parseInt(id));
    if (!product) throw new Error('Product not found');
    return product;
  }
}