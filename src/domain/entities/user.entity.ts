import { BaseEntity, EntityProps } from './base.entity';
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';

export interface UserProps extends EntityProps {
  email: Email;
  password: Password;
  name: string;
  isActive?: boolean;
  role?: UserRole;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export class User extends BaseEntity<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  public static create(props: UserProps): User {
    return new User({
      ...props,
      isActive: props.isActive ?? true,
      role: props.role ?? UserRole.USER,
    });
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): Password {
    return this.props.password;
  }

  get name(): string {
    return this.props.name;
  }

  get isActive(): boolean {
    return this.props.isActive ?? true;
  }

  get role(): UserRole {
    return this.props.role ?? UserRole.USER;
  }

  public updateName(name: string): void {
    this.props.name = name;
    this.touch();
  }

  public updateEmail(email: Email): void {
    this.props.email = email;
    this.touch();
  }

  public updatePassword(password: Password): void {
    this.props.password = password;
    this.touch();
  }

  public activate(): void {
    this.props.isActive = true;
    this.touch();
  }

  public deactivate(): void {
    this.props.isActive = false;
    this.touch();
  }

  public changeRole(role: UserRole): void {
    this.props.role = role;
    this.touch();
  }

  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      email: this.email.value,
      name: this.name,
      isActive: this.isActive,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
