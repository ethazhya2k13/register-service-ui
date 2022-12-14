export class Users {
  userId!: number;
  firstName!: string;
  lastName!: string;
  userName!: string;
  userPassword!: string;
  userEmail!: string;
  userGender!: string;
  created!: string;
  updatedAt!: string;
  roleId!: number;
  roleName!: string;
  // roles!: Roles;
}

//typecheckign = interface
//deals with business login = class
// Because all you need to do with this model is handle type-checking.

// If the instance called for methods that handle business logic, I would probably have chosen a class.
