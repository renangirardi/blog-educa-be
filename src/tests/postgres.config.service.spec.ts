import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PostgresConfigService } from '../config/postgres.config.service';

const mockConfigService = {
  get: jest.fn((key: string) => {
    switch (key) {
      case 'DB_HOST':
        return 'localhost';
      case 'DB_PORT':
        return 5432;
      case 'DB_USERNAME':
        return 'testuser';
      case 'DB_PASSWORD':
        return 'testpass';
      case 'DB_NAME':
        return 'testdb';
      default:
        return null;
    }
  }),
};

describe('PostgresConfigService', () => {
  let service: PostgresConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostgresConfigService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<PostgresConfigService>(PostgresConfigService);
    configService = module.get<ConfigService>(ConfigService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create TypeOrm options with values from ConfigService', () => {
    const options = service.createTypeOrmOptions();

    expect(configService.get).toHaveBeenCalledWith('DB_HOST');
    expect(configService.get).toHaveBeenCalledWith('DB_PORT');
    expect(configService.get).toHaveBeenCalledWith('DB_USERNAME');
    expect(configService.get).toHaveBeenCalledWith('DB_PASSWORD');
    expect(configService.get).toHaveBeenCalledWith('DB_NAME');

    expect(options.type).toBe('postgres');
    expect(options.host).toBe('localhost');
    expect(options.port).toBe(5432);
    expect(options.username).toBe('testuser');
    expect(options.password).toBe('testpass');
    expect(options.database).toBe('testdb');
    expect(options.entities).toEqual(['dist/**/*.entity{.ts,.js}']);
    expect(options.synchronize).toBe(true);
  });
});
