export interface Categoria {
  id?: number;
  nome: string;
}

export interface Produto {
  id?: number;
  nome: string;
  preco: number;
  foto?: string;
  categoria?: Categoria;
}
