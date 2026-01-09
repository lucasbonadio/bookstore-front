import axios from "axios";
import type { Book } from "../types/Book";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>("/Books");
  return response.data;
};

export const createBook = async (formData: FormData): Promise<Book> => {
  const response = await api.post<Book>("/books", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
