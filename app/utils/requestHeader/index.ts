import { getToken } from '#utils/storage';

export type AuthHeader = { Authorization: string };

export default async function authHeader(): Promise<AuthHeader | Record<string, unknown>> {
  const token = await getToken();

  return token ? { Authorization: token } : {};
}
