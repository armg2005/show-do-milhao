import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const valoresPorPergunta = [
  // Rodada 1
  500, 500, 1000,
  // Rodada 2
  1000, 1500, 1500,
  // Rodada 3
  2000, 2000, 3000,
  // Rodada 4
  3000, 4000, 5000,
  // Rodada 5
  5000, 10000, 20000 
];

const perguntasBase = [
    
  {
    texto: "Qual é o menor número primo?",
    alternativas: ["0", "1", "2", "3"],
    correta: 3
  },
  {
    texto: "Quem pintou a Mona Lisa?",
    alternativas: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Michelangelo"],
    correta: 2
  },
  {
    texto: "Qual é o maior planeta do sistema solar?",
    alternativas: ["Terra", "Marte", "Júpiter", "Saturno"],
    correta: 3
  },
  {
    texto: "Qual país é conhecido pelo samba e futebol?",
    alternativas: ["México", "Brasil", "Espanha", "Argentina"],
    correta: 2
  },
  {
    texto: "Em que continente fica o Egito?",
    alternativas: ["África", "Ásia", "Europa", "América"],
    correta: 1
  },
  {
    texto: "Quantos segundos tem uma hora?",
    alternativas: ["3.600", "60.000", "6.000", "360"],
    correta: 1
  },
  {
    texto: "Quem escreveu 'Dom Casmurro'?",
    alternativas: ["José de Alencar", "Machado de Assis", "Graciliano Ramos", "Carlos Drummond"],
    correta: 2
  },
  {
    texto: "Qual elemento químico tem símbolo O?",
    alternativas: ["Ouro", "Oxigênio", "Ozônio", "Ósmio"],
    correta: 2
  },
  {
    texto: "Qual desses números é ímpar?",
    alternativas: ["4", "8", "10", "11"],
    correta: 4
  },
  {
    texto: "Em que país está localizada a Torre Eiffel?",
    alternativas: ["França", "Itália", "Espanha", "Alemanha"],
    correta: 1
  },
  {
    texto: "Qual a capital do Japão?",
    alternativas: ["Tóquio", "Pequim", "Seul", "Bangkok"],
    correta: 1
  },
  {
    texto: "Quem descobriu o Brasil?",
    alternativas: ["Cristóvão Colombo", "Pedro Álvares Cabral", "Dom Pedro I", "Vasco da Gama"],
    correta: 2
  },
  {
    texto: "Qual o plural de 'cão'?",
    alternativas: ["cãos", "cães", "cões", "cãezes"],
    correta: 2
  },
  {
    texto: "Quantos lados tem um triângulo?",
    alternativas: ["3", "4", "5", "6"],
    correta: 1
  },
  {
    texto: "Qual planeta é conhecido como Planeta Vermelho?",
    alternativas: ["Vênus", "Saturno", "Marte", "Netuno"],
    correta: 3
  }
];

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function main() {
  const nome = await new Promise(resolve => {
    rl.question('Olá! Qual é o seu nome? ', (input) => resolve(input.trim()));
  });

  console.log(`\nBem-vindo(a) ao jogo, ${nome}!`);
  console.log('O jogo tem 5 rodadas, com 3 perguntas cada. O prêmio é somado a cada acerto.');
  console.log('Vamos começar!');

  let acumulado = 0;
  let indicePergunta = 0;
  const perguntas = embaralhar([...perguntasBase]);
  const NUMERO_DE_RODADAS = 5;

  // --- LÓGICA PRINCIPAL REESTRUTURADA ---
  // Loop externo para as 5 rodadas
  for (let rodada = 0; rodada < NUMERO_DE_RODADAS; rodada++) {
    console.log(`\n--- INICIANDO RODADA ${rodada + 1} ---`);
    
    // Loop interno para as 3 perguntas da rodada
    for (let i = 0; i < 3; i++) {
      const questaoAtual = perguntas[indicePergunta];
      
      // Apresenta a pergunta
      console.log(`\nPergunta ${indicePergunta + 1} (Rodada ${rodada + 1}): ${questaoAtual.texto}`);
      questaoAtual.alternativas.forEach((alt, j) => {
        console.log(`  ${j + 1}. ${alt}`);
      });
      
      const respostaJogador = await new Promise((resolve) => {
          rl.question('Escolha a alternativa (número): ', (input) => {
              const respostaNum = Number(input.trim());
              // Validação simples (pode ser melhorada como antes se desejar)
              resolve(respostaNum);
          });
      });

      // Avalia a resposta
      if (respostaJogador === questaoAtual.correta) {
        const ganho = valoresPorPergunta[indicePergunta];
        acumulado += ganho; // Prêmio agora é CUMULATIVO
        console.log(`Resposta correta! Você ganhou R$ ${ganho}. Total acumulado: R$ ${acumulado}`);
      } else {
        const respostaCertaTexto = questaoAtual.alternativas[questaoAtual.correta - 1];
        const perda = Math.floor(acumulado / 2);
        console.log(` Resposta errada! A correta era a ${questaoAtual.correta} ("${respostaCertaTexto}").`);
        console.log(`\nFim de jogo, ${nome}! Você sai com R$ ${perda}.`);
        rl.close();
        return; // Encerra o jogo imediatamente
      }
      
      indicePergunta++;
    }

    // --- LÓGICA DE PARAR OU CONTINUAR (ao final da rodada) ---
    console.log(`\nFim da Rodada ${rodada + 1}! ${nome}, seu total acumulado é R$ ${acumulado}.`);

    // Pergunta se quer continuar, exceto na última rodada
    if (rodada < NUMERO_DE_RODADAS - 1) {
       while(true) {
            const decisao = await new Promise(resolve => {
                rl.question(`Você quer PARAR e levar o dinheiro ou CONTINUAR para a próxima rodada? (parar/continuar): `, resolve);
            });

            if (decisao.toLowerCase().trim() === 'parar') {
                console.log(`\nÓtima decisão, ${nome}! Você está saindo do jogo com R$ ${acumulado}. Parabéns!`);
                rl.close();
                return;
            } else if (decisao.toLowerCase().trim() === 'continuar') {
                break;
            } else {
                console.log("Opção inválida. Por favor, digite 'parar' ou 'continuar'.");
            }
        }
    }
  }
  
  // Se o loop terminar, o jogador completou todas as rodadas
  console.log(`\n PARABÉNS, ${nome}! Você completou todas as 5 rodadas e ganhou o prêmio máximo de R$ ${acumulado}!`);
  rl.close();
}

main();