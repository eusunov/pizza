// TODO: Adapt for usage with the database ORM
import { IntersectionType } from '@nestjs/mapped-types'

import { UserRole } from '../user-role.enum'

export class User {
  id: string;
  email: string;
  password: string;
  phone: string;
  name: string;
  role: UserRole[];
  active: boolean;
  created: Date;
  updated: Date;
}
