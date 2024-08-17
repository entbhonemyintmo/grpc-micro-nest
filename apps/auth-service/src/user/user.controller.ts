import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  FindOneUserDto,
  PaginationDto,
  UpdateUserDto,
  Users,
  UserServiceController,
  UserServiceControllerMethods,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  findAllUser() {
    return this.userService.findAll();
  }

  findOneUser({ id }: FindOneUserDto) {
    return this.userService.findOne(id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  removeUser({ id }: FindOneUserDto) {
    return this.userService.remove(id);
  }

  queryUsers(request: Observable<PaginationDto>): Observable<Users> {
    return this.userService.queryUser(request);
  }
}
