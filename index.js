import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ajuda(resposta_correta) {
  console.log("1. Ajuda dos universitários");
  console.log("2. Assistente virtual");
  console.log("3. Cartas");
  console.log("4. Pular");

  rl.question("Qual a sua escolha: ", (entrada) => {
    const escolha_ajuda = Number(entrada);

    if (isNaN(escolha_ajuda)) {
      console.log("O número digitado não é válido.");
    } else {
      switch (escolha_ajuda) {
        case 1:
          console.log("Você escolheu a ajuda dos universitários:");
          console.log(`Indicamos: ${resposta_correta}`);
          break;

        case 2:
          console.log("Você escolheu assistente virtual:");
          console.log(`A resposta é: ${resposta_correta}`);
          break;

        case 3: 
            console.log("\nVocê escolheu as cartas:");
            const alternativas_incorretas = alternativas.filter(alt => alt !== resposta_correta);
            const incorreta_mantida = alternativas_incorretas[Math.floor(Math.random() * alternativas_incorretas.length)];
            
            console.log(`As cartas eliminaram duas opções. Você ficou entre: ${resposta_correta} e ${incorreta_mantida}`);
            break;

        case 4:
          console.log("Você escolheu pular a pergunta!");
          break;

        default:
          console.log("Escolha inválida. Tente de novo.");
      }
    }

    rl.close();
  });
}


let continuar =true;

console.log("jogo do milhão");
rl.question("Digite seu nome :" ,(nome) =>{
    console.log(`Olá, ${nome}!`)
    rl.close();
});

while(continuar){
    console.log("Pergunta 1 : R$ 1.000");
    console.log("Qual é o menor número primo?");
    console.log("1. 0");
    console.log("2. 1");
    console.log("3. 2");
    console.log("4. 3");
    rl.question("Deseja algum tipo de ajuda? S/N" ,(resposta)=> {
        if(resposta==S||resposta==s){
            ajuda(2)

        }

        rl.close();
    });
}