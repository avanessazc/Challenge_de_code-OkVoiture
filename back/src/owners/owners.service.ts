import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersRepository } from './owners.repository';
import { OwnerFormValuesDto } from '../owners/dtos';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(OwnersRepository)
    private ownersRepository: OwnersRepository,
  ) {}

  // async createOwner(owner: OwnerFormValuesDto, car: Cars): Promise<string> {
  async createOwner(owner: OwnerFormValuesDto) {
    try {
      // const newCar = new Cars();
      // newCar.id = car.id
      // newCar.designation = car.designation
      // newCar.numberplate = car.numberplate
      // newCar.city = car.city
      // newCar.price = car.price
      // newCar.photo_name = car.photo_name
      // const newOwner = new Owners();
      // newOwner.username = owner.username
      // newOwner.email = owner.email
      // newOwner.cars = [car]
      // owner.cars = [car]
      // const ret = await this.ownersRepository.upsert([owner], ['email']);
      // console.log('ret: ', ret);
      // console.log('ret.raw[0].id: ', ret.raw[0].id);
      // return ret.raw[0].id;
      // const ret = await this.ownersRepository.save(owner);
      // return ret;

      let ret = await this.ownersRepository.findOne({
        where: {
          email: owner.email,
        },
      });
      console.log('findOne RET: ', ret);
      if (!ret) {
        ret = await this.ownersRepository.save(owner);
        console.log('Save RET: ', ret);
      }
      return ret;
    } catch (error) {
      // if (error.code === dataBaseErrors[0].code) {
      //   throw new ConflictException('Owner ' + dataBaseErrors[0].message);
      // } else if (error.code === dataBaseErrors[1].code) {
      //   throw new ConflictException('Owner ' + dataBaseErrors[1].message);
      // } else {
      console.log(error.code);
      console.log(error.message);
      // throw new InternalServerErrorException();
      // }
    }
  }
}
