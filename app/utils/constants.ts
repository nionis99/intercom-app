export const DEFAULT_LANGUAGE = 'lt';
export const DEFAULT_MEMBER_NAME = 'user';

export const API = 'http://intercom.ntt.lt/api';
export const API_VERSION = 'v1';
export const BACKEND_URL = `${API}/${API_VERSION}`;

export const USER_URL = `${BACKEND_URL}/user_owner`;
export const AUTH_URL = `${BACKEND_URL}/auth`;
export const MEMBERS = `${BACKEND_URL}/account_owner`;
export const GET_MEMBERS = `${MEMBERS}/items`;
export const GET_DOORS = `${BACKEND_URL}/door_owner/items`;
export const GET_OWNER_PLACES = `${BACKEND_URL}/flat_owner/items`;
export const GET_CARD_TYPES = `${BACKEND_URL}/card_type/items`;
export const CARDS = `${BACKEND_URL}/card_owner`;
export const GET_CARDS = `${CARDS}/items`;
