export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly size: string;
  readonly color: string;
  readonly imageUrl: string;
  readonly isAvailable: boolean;
}
