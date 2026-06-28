const BASE_URL = 'https://fakestoreapi.com';

export class ApiError extends Error {}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
