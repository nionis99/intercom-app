import { getToken } from '#utils/storage';

export type AuthHeader = { Authorization: string };

export default function authHeader(): AuthHeader | Record<string, unknown> {
  const token = getToken();

  return token ? { Authorization: token } : {};
}
