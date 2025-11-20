import { API_BASE_URL } from "../utils/constants";

export const apiService = {
  async login(username, password) {
    console.log("API_BASE_URL:", API_BASE_URL);
    console.log("Logging in with:", { username, password });
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    console.log("Login response status:", response.status);
    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    return await response.json();
  },

  async getCarros(token) {
    const response = await fetch(`${API_BASE_URL}/carros/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Error al obtener carros");
    return await response.json();
  },

  async createCarro(token, data) {
    console.log("Creating carro with data:", data);
    const response = await fetch(`${API_BASE_URL}/carros/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear carro");
    }

    return await response.json();
  },

  async getCiudades(token) {
    const response = await fetch(`${API_BASE_URL}/ciudades/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Error al obtener ciudades");
    return await response.json();
  },

  async createViaje(token, data) {
    console.log("Creating viaje with data:", data);
    const response = await fetch(`${API_BASE_URL}/viajes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear viaje");
    }

    return await response.json();
  },

  async getViajesByPlaca(token, placa) {
    const response = await fetch(`${API_BASE_URL}/viajes?placa=${placa}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Error al obtener viajes");
    return await response.json();
  },
};
