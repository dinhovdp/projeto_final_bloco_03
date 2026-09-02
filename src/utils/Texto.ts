// tira acentos e deixa tudo minusculo, pra comparar texto sem se importar
// com maiuscula/minuscula nem acentuacao (ex: "AÇÚCAR" e "acucar" batem)
export function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// verifica se um id bate exatamente com o termo digitado (quando o termo e so numero)
export function idBateComTermo(id: number | undefined, termo: string): boolean {
  if (id === undefined) return false;
  const termoLimpo = termo.trim();
  return /^\d+$/.test(termoLimpo) && Number(termoLimpo) === id;
}