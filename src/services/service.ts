import axios from "axios";
import type { Categoria, Produto } from "../models";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const buscarCategorias = async () => {
  return await api.get<Categoria[]>("/categorias");
};

// busca uma categoria unica, usado no form de edicao e na tela de deletar
export const buscarCategoriaPorId = async (id: number) => {
  return await api.get<Categoria>(`/categorias/${id}`);
};

export const cadastrarCategoria = async (categoria: Categoria) => {
  return await api.post<Categoria>("/categorias", categoria);
};

export const atualizarCategoria = async (categoria: Categoria) => {
  return await api.put<Categoria>(`/categorias`, categoria);
};

export const deletarCategoria = async (id: number) => {
  return await api.delete(`/categorias/${id}`);
};

export const buscarProdutos = async () => {
  return await api.get<Produto[]>("/produtos");
};

// busca um produto unico, usado no form de edicao e na tela de deletar
export const buscarProdutoPorId = async (id: number) => {
  return await api.get<Produto>(`/produtos/${id}`);
};

export const cadastrarProduto = async (produto: Produto) => {
  return await api.post<Produto>("/produtos", produto);
};

export const atualizarProduto = async (produto: Produto) => {
  return await api.put<Produto>(`/produtos`, produto);
};

export const deletarProduto = async (id: number) => {
  return await api.delete(`/produtos/${id}`);
};
