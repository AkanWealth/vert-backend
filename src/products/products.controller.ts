import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, HttpCode, BadRequestException, UploadedFiles, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MulterConfigService } from 'src/config/multer.config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async create(@Body() createProductDto: CreateProductDto):Promise<any> {
  //   return await this.productsService.create(createProductDto);
  // }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('images', 10, new MulterConfigService().createMulterOptions()))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<any> {
    if (!files || files.length === 0) {
      console.log("No files uploaded")
      throw new BadRequestException('No files uploaded');
    }

    const baseUrl = this.configService.get<string>('BASE_URL');
    const imageUrls = files.map(file => `${baseUrl}/${file.filename}`);

    const productData = {
      ...createProductDto,
      imageUrls,
    };

    return await this.productsService.create(productData);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<any> {
    return await this.productsService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return await this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<any> {
    return await this.productsService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    return await this.productsService.remove(id);
  }
}
