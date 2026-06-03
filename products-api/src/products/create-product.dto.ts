import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Nike Air Max' })
  name: string;

  @ApiProperty({ example: 'Comfy sneakers' })
  description: string;

  @ApiProperty({ example: 129.99 })
  price: number;

  @ApiProperty({ example: 10 })
  stock: number;
}