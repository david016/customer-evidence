import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsInt,
  Min,
} from '@nestjs/class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'The name of the customer', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the customer',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The age of the customer', example: 30 })
  @IsInt()
  @Min(0)
  age: number;
}
