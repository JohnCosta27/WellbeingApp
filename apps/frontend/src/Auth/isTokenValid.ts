import jwt_decode from 'jwt-decode';

/**
 * Checks if the access token is valid by:
 * A. Of a correct form
 * B. Not experired
 * @returns boolen = valid
 */
export function isTokenValid(type: 'access' | 'refresh'): boolean {
  const access = localStorage.getItem(type);
  if (!access) return false;

  try {
    const decoded = jwt_decode(access) as { [key: string]: string };
    if (!('type' in decoded && 'uuid' in decoded && 'exp' in decoded)) {
      return false;
    }

    const expDate = new Date(decoded.exp);
    const timeNow = new Date();

    return timeNow.getTime() < expDate.getTime();
  } catch (e) {
    return false;
  }
}
