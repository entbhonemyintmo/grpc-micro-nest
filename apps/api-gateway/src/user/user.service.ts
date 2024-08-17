import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  AUTH_PACKAGE_NAME,
  CreateUserDto,
  UpdateUserDto,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(AUTH_PACKAGE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  findAll() {
    return this.userService.findAllUser({});
  }

  findOne(id: string) {
    return this.userService.findOneUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ id, ...updateUserDto });
  }

  remove(id: string) {
    return this.userService.findOneUser({ id });
  }
}
