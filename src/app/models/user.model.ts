// Define a "forma" de um objeto de Usuário
export interface User {
  id: number;
  email: string;
  nomeCompleto: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  isAdmin?: boolean; 
  cartoes?: any[];
}