import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;
  let repository: Repository<Customer>;

  const mockRepository = {
    find: jest.fn(() =>
      Promise.resolve([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 30 },
      ]),
    ),
    findOneBy: jest.fn(({ id }) =>
      Promise.resolve({
        id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
      }),
    ),
    create: jest.fn((dto) => ({ ...dto })),
    save: jest.fn((dto) => Promise.resolve({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        { provide: getRepositoryToken(Customer), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      expect(await controller.findAll()).toEqual([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 30 },
      ]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a customer', async () => {
      expect(await controller.findOne('1')).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
      });
    });
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const dto = { name: 'Jane Doe', email: 'jane.doe@example.com', age: 25 };
      const expectedCustomer = { id: 1, ...dto };

      const result = await controller.create(dto);

      expect(result).toEqual(expectedCustomer);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalled();
    });
  });
});
