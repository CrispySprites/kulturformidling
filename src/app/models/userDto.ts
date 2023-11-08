export class UserDto {
  email?: string;
  password?: string;
}

export class UserNameDto {
  userId = 0
  userName = "";
}

export class NewUserDto {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export class UserClamesDto {
  userName = "";
  userEmail = "";
  userRoleName = "";
}

export class UserRequestDto {
  requestId = 0;
  userName = "";
  roleName = "";
}

