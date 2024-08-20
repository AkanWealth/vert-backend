import { IsNotEmpty, IsNumber, IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  discountPercentage?: number;

  @IsString()
  size: string;

  @IsString()
  color: string;

  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
