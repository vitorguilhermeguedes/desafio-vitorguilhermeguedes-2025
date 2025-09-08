const animais = {
  Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
  Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
  Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
  Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
  Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
  Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
  Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] }
};

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const pessoa1 = brinquedosPessoa1.split(",").map(b => b.trim());
    const pessoa2 = brinquedosPessoa2.split(",").map(b => b.trim());
    const ordem = ordemAnimais.split(",").map(a => a.trim());

    if (new Set(pessoa1).size !== pessoa1.length || new Set(pessoa2).size !== pessoa2.length) {
      return { erro: "Brinquedo inválido" };
    }
    if (new Set(ordem).size !== ordem.length) {
      return { erro: "Animal inválido" };
    }

    let adotados = { pessoa1: 0, pessoa2: 0 };
    let locoEsperando = null;
    let resultado = [];

    for (let nome of ordem) {
      const animal = animais[nome];
      if (!animal) return { erro: "Animal inválido" };

      let pode1 = this.verifica(pessoa1, animal, nome);
      let pode2 = this.verifica(pessoa2, animal, nome);

      if (animal.tipo === "gato" && pode1 && pode2) {
        resultado.push(`${nome} - abrigo`);
        continue;
      }

      if (nome === "Loco") {
        locoEsperando = { nome, pode1, pode2 };
        continue;
      }

      let escolhido = "abrigo";
      if (pode1 && adotados.pessoa1 < 3 && (!pode2 || animal.tipo === "gato")) {
        escolhido = "pessoa 1";
        adotados.pessoa1++;
      } else if (pode2 && adotados.pessoa2 < 3 && (!pode1 || animal.tipo === "gato")) {
        escolhido = "pessoa 2";
        adotados.pessoa2++;
      }
      resultado.push(`${nome} - ${escolhido}`);
    }

    if (locoEsperando) {
      let { nome, pode1, pode2 } = locoEsperando;
      let escolhido = "abrigo";
      if (adotados.pessoa1 > 0 && pode1 && adotados.pessoa1 < 3) {
        escolhido = "pessoa 1";
        adotados.pessoa1++;
      } else if (adotados.pessoa2 > 0 && pode2 && adotados.pessoa2 < 3) {
        escolhido = "pessoa 2";
        adotados.pessoa2++;
      }
      resultado.push(`${nome} - ${escolhido}`);
    }

    return { lista: resultado.sort(), erro: null };
  }

  verifica(brinquedosPessoa, animal, nome) {
    if (nome === "Loco") {
      return true;
    }
    const fav = animal.brinquedos;
    let idx = 0;
    for (let b of brinquedosPessoa) {
      if (b === fav[idx]) idx++;
      if (idx === fav.length) return true;
    }
    return idx === fav.length;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
