import { DomainError } from '../errors/domain.error';

export class Email {
  private readonly _value: string;

  private constructor(email: string) {
    this._value = email.toLowerCase().trim();
  }

  public static create(email: string): Email {
    if (!email) {
      throw new DomainError('Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new DomainError('Invalid email format');
    }

    return new Email(email);
  }

  get value(): string {
    return this._value;
  }

  public equals(email: Email): boolean {
    return this._value === email._value;
  }

  public toString(): string {
    return this._value;
  }
}
