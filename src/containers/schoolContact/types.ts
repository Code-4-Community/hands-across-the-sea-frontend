export interface SchoolContactRequest {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly address: string;
  readonly phone: string;
  readonly type: ContactType;
}

export interface SchoolContactResponse extends SchoolContactRequest {
  readonly id: number;
  readonly schoolId: number;
}

export enum ContactType {
  PRINCIPAL = 'Principal',
  LITERACY_COORDINATOR = 'Literacy Coordinator',
  LIBRARIAN = 'Librarian',
  OTHER = 'Other',
}
