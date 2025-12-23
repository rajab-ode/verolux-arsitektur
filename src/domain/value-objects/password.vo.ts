import { DomainError } from '../errors/domain.error';

export class Password {
  private readonly _value: string;
  private readonly _isHashed: boolean;

  private constructor(password: string, isHashed: boolean = false) {
    this._value = password;
    this._isHashed = isHashed;
  }

  public static create(password: string): Password {
    if (!password) {
      throw new DomainError('Password is required');
    }

    if (password.length < 8) {
      throw new DomainError('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      throw new DomainError('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      throw new DomainError('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      throw new DomainError('Password must contain at least one number');
    }

    return new Password(password, false);
  }

  public static fromHashed(hashedPassword: string): Password {
    return new Password(hashedPassword, true);
  }

  get value(): string {
    return this._value;
  }

  get isHashed(): boolean {
    return this._isHashed;
  }

  public toString(): string {
    return this._value;
  }
}
