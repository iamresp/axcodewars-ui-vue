import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { CreateUserResponseDto, Jwt, User } from './models';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') ?? '');
  const uuid = ref<string>(localStorage.getItem('uuid') ?? '');
  const username = ref<string>(localStorage.getItem('username') ?? '');
  const hash = ref<string>('');
  const avatar = ref<string>('');
  const connId = ref<string>('');

  const isAuthorized = computed(() => token.value && uuid.value);

  const reset = () => {
    token.value = '';
    uuid.value = '';
    username.value = '';
    hash.value = '';
    avatar.value = '';
    connId.value = '';
  };

  const getUser = async (): Promise<User> => {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });

    const user = await response.json() as User;

    uuid.value = user.uuid;
    username.value = user.username;
    avatar.value = user.avatar;

    localStorage.setItem('uuid', uuid.value);
    localStorage.setItem('username', username.value);

    return user;
  };

  const updateUser = async (): Promise<User> => {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar.value,
        connId: connId.value,
        username: username.value,
        hash: hash.value,
      }),
    });

    const user = await response.json() as User;

    username.value = user.username;
    avatar.value = user.avatar;

    localStorage.setItem('username', username.value);

    return user;
  };

  const signIn = async () => {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        hash: hash.value,
      }),
    });
    const jwt = await response.json() as Jwt;

    token.value = jwt.access_token;
    localStorage.setItem('token', token.value);
    await getUser();
  };

  const signUp = async () => {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        hash: hash.value,
        avatar: avatar.value,
      }),
    });

    const dto = await response.json() as CreateUserResponseDto;

    uuid.value = dto.uuid;
    await signIn();
  };

  return {
    avatar,
    connId,
    hash,
    isAuthorized,
    token,
    username,
    uuid,

    getUser,
    reset,
    signIn,
    signUp,
    updateUser,
  };
});
