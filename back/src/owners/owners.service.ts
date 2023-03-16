import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersRepository } from './owners.repository';
import { OwnerFormValuesDto } from '../owners/dtos';
import { Owners } from '../entities';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(OwnersRepository)
    private ownersRepository: OwnersRepository,
  ) {}

  async createOwner(owner: OwnerFormValuesDto): Promise<Owners | never> {
    try {
      let ret = await this.ownersRepository.findOne({
        where: {
          email: owner.email,
        },
      });
      if (!ret) {
        ret = await this.ownersRepository.save(owner);
      }
      return ret;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
