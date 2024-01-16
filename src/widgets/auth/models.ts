export interface Jwt {
  access_token: string;
}

export interface CreateUserResponseDto {
  uuid: string;
}

export interface User {
  avatar: string;
  username: string;
  uuid: string;
}

export interface PeerUser {
  avatar: string;
  username: string;
}
