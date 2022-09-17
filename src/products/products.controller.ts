import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product-response.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  
  @Post()
  @Auth()
  @ApiOperation({ operationId: "createProduct", description: "Create a product" })
  @ApiCreatedResponse({ description: "Response the product created", type: [ProductResponseDto] })
  @ApiBadRequestResponse({ description: "Error trying to create a product" })
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  //@Auth()
  @ApiOperation({ operationId: "getProducts", description: "Return all products " })
  @ApiOkResponse({ description: "Response all products active", type: [ProductResponseDto] })
  @ApiBadRequestResponse({ description: "Error" })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ operationId: "getProductById", description: "Return product by id" })
  @ApiResponse({ status: 200, description: "Response a product", type: ProductResponseDto })
  @ApiResponse({ status: 400, description: "Error" })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  @ApiOperation({ operationId: "updateProductById", description: "update a product by id" })
  @ApiResponse({ status: 200, description: "Update a product", type: ProductResponseDto })
  @ApiResponse({ status: 400, description: "Error" })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ operationId: "deleteProductById", description: "delete a product by id" })
  @ApiResponse({ status: 200, description: "Delete a product", type: String })
  @ApiResponse({ status: 400, description: "Error" })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);


  }
}
