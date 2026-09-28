// Dados brutos fictícios das 15 disciplinas do 8º Ano
const dadosBoletim = [
  { disciplina: "Língua Portuguesa", tri1: 82, tri2: "7,8", tri3: 85, faltas: [2, 1, 1] },
  { disciplina: "Matemática", tri1: 52, tri2: "5,8", tri3: null, faltas: [3, 2, 1] },
  { disciplina: "Ciências", tri1: "8,1", tri2: 76, tri3: 8.0, faltas: [1, 2, 0] },
  { disciplina: "História", tri1: 7.0, tri2: 84, tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Geografia", tri1: 68, tri2: 7.3, tri3: "7,9", faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 86, tri2: "8,1", tri3: 8.7, faltas: [1, 0, 0] },
  { disciplina: "Arte", tri1: 9.0, tri2: 92, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 95, tri2: 9.0, tri3: "9,4", faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 88, tri2: 9.1, tri3: 93, faltas: [1, 0, 1] },
  { disciplina: "Educação Financeira", tri1: 74, tri2: "7,8", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Estudo Orientado", tri1: 8.0, tri2: 83, tri3: "8,5", faltas: [0, 1, 0] },
  { disciplina: "Redação e Leitura", tri1: 62, tri2: "6,8", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 48, tri2: 5.6, tri3: "6,0", faltas: [2, 2, 1] },
  { disciplina: "Literatura Arte e Movimento", tri1: "7,7", tri2: 80, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Práticas Experimentais", tri1: 58, tri2: "6,2", tri3: 6.4, faltas: [1, 1, 1] }
];

// Função que padroniza as notas para a escala de 0 a 10
function normalizarNota(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return null; // Nota ainda não lançada
    }

    // Se for texto com vírgula, troca por ponto decimal
    if (typeof valor === "string") {
        valor = valor.replace(",", ".");
    }

    let num = Number(valor);

    // Se não for um número válido
    if (isNaN(num)) {
        return null;
    }

    // Trata valores maiores que 10 e até 100 (ex: 82 vira 8.2)
    if (num > 10 && num <= 100) {
        num = num / 10;
    }

    // Retorna a nota válida entre 0 e 10
    if (num >= 0 && num <= 10) {
        return num;
    }

    return null; // Fora das regras
}

// Função para formatar o número na tela (ex: 8.2 vira "8,2")
function formatarExibicao(nota) {
    if (nota === null) return "—";
    return nota.toFixed(1).replace(".", ",");
}

// Função principal que constrói a tabela e calcula os resumos
function carregarBoletim() {
    const corpoTabela = document.getElementById("corpo-tabela");
    corpoTabela.innerHTML = "";

    let somaMediasGerais = 0;
    let qtdDisciplinasComMedia = 0;
    let totalFaltasGeral = 0;
    let qtdBomDesempenho = 0;
    let qtdAtencao = 0;

    // Passa por cada disciplina da lista
    dadosBoletim.forEach(item => {
        // Normaliza as 3 notas
        const n1 = normalizarNota(item.tri1);
        const n2 = normalizarNota(item.tri2);
        const n3 = normalizarNota(item.tri3);

        // Soma as faltas dos trimestres
        const totalFaltas = item.faltas.reduce((acc, curr) => acc + curr, 0);
        totalFaltasGeral += totalFaltas;

        // Calcula a média considerando apenas notas disponíveis
        const notasValidas = [n1, n2, n3].filter(n => n !== null);
        let media = null;
        let situacao = "Nota ainda não disponível";
        let classeSituacao = "situacao-indisponivel";

        if (notasValidas.length > 0) {
            const soma = notasValidas.reduce((a, b) => a + b, 0);
            media = soma / notasValidas.length;
            somaMediasGerais += media;
            qtdDisciplinasComMedia++;

            if (media >= 6.0) {
                situacao = "Bom desempenho";
                classeSituacao = "situacao-bom";
                qtdBomDesempenho++;
            } else {
                situacao = "Atenção";
                classeSituacao = "situacao-atencao";
                qtdAtencao++;
            }
        }

        // Cria a linha da tabela no HTML usando o DOM
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${item.disciplina}</strong></td>
            <td>${formatarExibicao(n1)}</td>
            <td>${formatarExibicao(n2)}</td>
            <td>${formatarExibicao(n3)}</td>
            <td><strong>${formatarExibicao(media)}</strong></td>
            <td>${totalFaltas}</td>
            <td class="${classeSituacao}">${situacao}</td>
        `;
        corpoTabela.appendChild(tr);
    });

    // Atualiza os Cards do topo
    const mediaGeralFinal = qtdDisciplinasComMedia > 0 ? (somaMediasGerais / qtdDisciplinasComMedia) : null;
    document.getElementById("card-media-geral").innerText = formatarExibicao(mediaGeralFinal);
    document.getElementById("card-total-faltas").innerText = totalFaltasGeral;
    document.getElementById("card-bom-desempenho").innerText = qtdBomDesempenho;
    document.getElementById("card-atencao").innerText = qtdAtencao;

    /* 
       NOTA SOBRE FREQUÊNCIA:
       Este percentual de 92% é apenas demonstrativo e fictício para esta versão.
       Em versões futuras, será calculado de forma dinâmica.
    */
    document.getElementById("card-frequencia").innerText = "92%";
}

// Executa a função assim que a página carrega
carregarBoletim();