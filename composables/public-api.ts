import type { SResponse } from "~/types/s-response";


export async function usePrivateApi<T>(
  url: string,
  param: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
  }
) {
  const app = useApp();
  try {
    const data: SResponse<T> = await $fetch(url, {
      baseURL: "https://api.motionsportindonesia.id",
      method: param.method,
      body: param.body,
      headers: param.headers ?? app.getAuthorization(),
    });
    return data;
  } catch (error) {
    throw error;
  }
}


export async function usePublicApi<T>(
  url: string,
  param: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
  }
) {
  try {
    const data: SResponse<T> = await $fetch(url, {
      baseURL: "https://api.motionsportindonesia.id",
      method: param.method,
      body: param.body,
      headers: param.headers,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
