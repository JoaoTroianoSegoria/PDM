import Constants from "expo-constants";
import { Platform } from "react-native";

function getMetroHostUrl() {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    Constants.manifest2?.extra?.expoClient?.hostUri ??
    Constants.manifest?.debuggerHost;

  const host = hostUri?.split(":")?.[0];
  return host ? `http://${host}:3000` : null;
}

const fallbackUrl = Platform.select({
  android: "http://10.0.2.2:3000",
  default: "http://localhost:3000",
});

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? getMetroHostUrl() ?? fallbackUrl;

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      body?.error ??
      body?.message ??
      `Erro ${response.status} ao acessar ${path}`;
    throw new Error(message);
  }

  return body;
}

export const financeApi = {
  getCategories() {
    return request("/categories");
  },

  createCategory(category) {
    return request("/categories", {
      method: "POST",
      body: JSON.stringify(category),
    });
  },

  getTransactions() {
    return request("/transactions");
  },

  createTransaction(transaction) {
    return request("/transactions", {
      method: "POST",
      body: JSON.stringify(transaction),
    });
  },

  deleteTransaction(id) {
    return request(`/transactions/${id}`, {
      method: "DELETE",
    });
  },
};
