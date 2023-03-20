export * from './ProtectedRoute';
export * from './Login';
export * from './isTokenValid';

export function setToken(type: 'access' | 'refresh', token: string) {
  localStorage.setItem(type, token);
}
