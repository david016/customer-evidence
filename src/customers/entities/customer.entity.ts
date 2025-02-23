import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @Column()
  email: string;

  @ApiProperty({ example: 30 })
  @Column()
  age: number;

  constructor(customer: Partial<Customer>) {
    Object.assign(this, customer);
  }
}
