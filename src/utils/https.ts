import axios from "axios";
import { IFormdata } from "../interface";

// const API_URL = "http://localhost:8000/api/v1";
const API_URL = "https://straitpay-todoapp-backend.onrender.com/api/v1";

// test

export async function addTodo(data: {
  name: string;
  start_date: string;
  priority_level: string;
}) {
  const response = await axios.post(`${API_URL}/todo`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function listMyTodos(user: string) {
  const response = await axios.get(`${API_URL}/todo/${user}/me`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function viewTodo(user: string, id: string) {
  const response = await axios.get(`${API_URL}/todo/${user}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function updateTodo(user: string, id: string, data: IFormdata) {
  const response = await axios.patch(`${API_URL}/todo/${user}/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function completeTodo(
  user: string,
  id: string,
  data: { status: string }
) {
  const response = await axios.patch(`${API_URL}/todo/${user}/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function deleteTodo(user: string, id: string) {
  const response = await axios.delete(`${API_URL}/todo/${user}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}
