import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOkResponse({ description: 'List of customers.', type: [Customer] })
  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @ApiOkResponse({ description: 'Customer found.', type: Customer })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }

  @ApiCreatedResponse({ description: 'Customer created.', type: Customer })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @ApiOkResponse({ description: 'Customer updated.', type: Customer })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @ApiOkResponse({ description: 'Customer removed.', type: Customer })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.customersService.remove(id);
  }
}
