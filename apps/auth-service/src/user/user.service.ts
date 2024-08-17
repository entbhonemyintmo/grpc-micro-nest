import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  PaginationDto,
  UpdateUserDto,
  User,
  Users,
} from '@app/common';
import { randomUUID } from 'crypto';
import { RpcException } from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for (let i = 0; i <= 100; i++) {
      this.create({ username: randomUUID(), password: randomUUID(), age: 0 });
    }
  }

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };

    this.users.push(user);

    return user;
  }

  findAll(): Users {
    return { users: this.users };
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new RpcException('user not found');
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const idx = this.users.findIndex((user) => user.id === id);

    if (idx === -1) throw new RpcException('user not found');

    this.users[idx] = { ...this.users[idx], ...updateUserDto };
    return this.users[idx];
  }

  remove(id: string): User {
    const idx = this.users.findIndex((user) => user.id === id);

    if (idx === -1) throw new RpcException('user not found');

    return this.users.splice(idx)[0];
  }

  queryUser(paginationDtoStream: Observable<PaginationDto>) {
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };
    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
