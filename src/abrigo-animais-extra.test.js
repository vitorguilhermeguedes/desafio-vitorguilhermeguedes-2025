import { AbrigoAnimais } from "./abrigo-animais.js";

describe("AbrigoAnimais - Teste completo", () => {
  let abrigo;

  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test("Casos básicos de adoção", () => {
    const result = abrigo.encontraPessoas(
      "RATO,BOLA,LASER",
      "BOLA,LASER,CAIXA",
      "Rex,Mimi,Fofo"
    );
    expect(result.erro).toBeNull();
    expect(result.lista).toContain("Rex - pessoa 1");
    expect(result.lista).toContain("Mimi - abrigo");
    expect(result.lista).toContain("Fofo - abrigo");
  });

  test("Loco vai para abrigo porque ninguém pode adotar", () => {
    const result = abrigo.encontraPessoas(
      "BOLA,CAIXA",
      "LASER,CAIXA",
      "Loco"
    );
    expect(result.erro).toBeNull();
    expect(result.lista).toContain("Loco - abrigo");
  });

  test("Loco adotado por pessoa 1", () => {
    const result = abrigo.encontraPessoas(
      "RATO,BOLA,SKATE",
      "BOLA,CAIXA",
      "Rex,Loco"
    );
    expect(result.erro).toBeNull();
    expect(result.lista).toContain("Rex - pessoa 1");
    expect(result.lista).toContain("Loco - pessoa 1");
  });

  test("Loco adotado por pessoa 2", () => {
    const result = abrigo.encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA,SKATE",
      "Rex,Loco"
    );
    expect(result.erro).toBeNull();
    expect(result.lista).toContain("Rex - pessoa 1");
    expect(result.lista).toContain("Loco - pessoa 2");
  });

  test("Validação de brinquedos repetidos", () => {
    const result = abrigo.encontraPessoas(
      "RATO,RATO",
      "BOLA,LASER",
      "Rex,Fofo"
    );
    expect(result.erro).toBe("Brinquedo inválido");
  });

  test("Validação de animais repetidos", () => {
    const result = abrigo.encontraPessoas(
      "RATO,BOLA",
      "BOLA,LASER",
      "Rex,Rex"
    );
    expect(result.erro).toBe("Animal inválido");
  });

  test("Gatos vão para abrigo mesmo que pessoas possam adotar", () => {
    const result = abrigo.encontraPessoas(
      "BOLA,LASER,RATO",
      "BOLA,LASER,RATO",
      "Mimi,Fofo,Zero"
    );
    expect(result.lista).toContain("Mimi - abrigo");
    expect(result.lista).toContain("Fofo - abrigo");
    expect(result.lista).toContain("Zero - abrigo");
  });

  test("Combinação de vários animais incluindo Loco", () => {
    const result = abrigo.encontraPessoas(
      "RATO,BOLA,SKATE",
      "BOLA,LASER,CAIXA",
      "Rex,Fofo,Loco,Mimi"
    );
    expect(result.erro).toBeNull();
    expect(result.lista).toContain("Rex - pessoa 1");
    expect(result.lista).toContain("Fofo - abrigo");
    expect(result.lista).toContain("Loco - pessoa 1");
    expect(result.lista).toContain("Mimi - pessoa 2");
  });
});
