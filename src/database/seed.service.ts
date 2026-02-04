import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // Ou bcryptjs
import { UserEntity } from '../entities/user.entity';
import UserProfileEnum from '../enum/user-profile-enum';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@blogeduca.com';

    const adminExists = await this.userRepository.findOneBy({ email: adminEmail });

    if (!adminExists) {
      this.logger.log('Admin user not found. Creating default admin...');

      const password = process.env.ADMIN_PASSWORD || 'admin123!';
      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = this.userRepository.create({
        username: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        profile: UserProfileEnum.admin,
      });

      await this.userRepository.save(admin);
      this.logger.log(`Admin user created: ${adminEmail}`);
    } else {
      this.logger.log('Admin user already exists. Skipping seed.');
    }
  }
}
