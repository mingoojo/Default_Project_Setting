import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "../entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const User = await this.userRepository.findOne({
        where: { email },
      });
      return User;
    } catch (error) {
      throw error;
    }
  }


  async createUser(user): Promise<User> {
    try {
      const { email, firstName, lastName, password } = user;


      const resultUser = this.userRepository.create({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        permission: "user",
        flag: "Y",
      });

      return await this.userRepository.save(resultUser);
    } catch (error) {
      throw error;
    }
  }

  async findUsers(): Promise<User[]> {
    return await this.userRepository.find({
      where: { permission: "user" },
    });

  }



  async updateUser(user) {
    return await this.userRepository.save(user);
  }

}
