import { Module } from '@nestjs/common';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars, Owners } from '../entities';
import { OwnersRepository } from './owners.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Owners, Cars])],
  controllers: [OwnersController],
  providers: [OwnersService, OwnersRepository, JwtService],
})
export class OwnersModule {}
