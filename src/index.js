const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

//Essa função gera um numero aleatorio de 1 a 6 como um dado.
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    //A condicional switch avalia uma expressão, combinando o valor da expressão para um cláusula case, e executa as instruções associadas ao case.
    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66: 
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }
   return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)    
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <=5; round++){
        console.log(`🏁 Rodada ${round}`);
        // Sortear bloco    
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        //Roalr os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;


        if (block === "RETA"){
        totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
        totalTestSkill2 = diceResult1 + character2.VELOCIDADE;
        
            await logRollResult(
                character1.NOME, 
                "velocidade",
                diceResult1,
                character1.VELOCIDADE
                );

            await logRollResult(
                character2.NOME, 
                "velocidade",
                diceResult2,
                character2.VELOCIDADE
            );
        }
        if (block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult1 + character2.MANOBRABILIDADE;
            
            await logRollResult(
                character1.NOME, 
                "manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE
            );

            await logRollResult(
                character2.NOME, 
                "manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE
            );
        }
        if (block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;       
            let powerResult2 = diceResult1 + character2.PODER;
            console.log(`${character1.NOME} confrontou ${character2.NOME}! 🥊`)

            await logRollResult(
                character1.NOME, 
                "poder",
                diceResult1,
                character1.PODER
            );

            await logRollResult(
                character2.NOME, 
                "poder",
                diceResult2,
                character2.PODER
            );0
            
            if (powerResult1 > powerResult2 && character2.PONTOS > 0){
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto! 🐢`);
                character2.PONTOS--;
            }
            if (powerResult2 > powerResult1 && character1.PONTOS > 0){
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto! 🐢`);
                character1.PONTOS--;
            }
            
            console.log(
                powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto foi perdido!" : ""
            )
            
        }

        //Verificar vencedor    
        if (totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou 1 ponto!`);
            character1.PONTOS++
        } else if (totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou 1 ponto!`);
            character2.PONTOS++;
        }
        
        console.log("--------------------------------------------------------")
    }
}

async function declareWinner(character1, character2){
    console.log("Resultado final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if (character1.PONTOS > character2.PONTOS)
        console.log(`\n ${character1.NOME} venceu a corrida! Parabéns! 🏆`)
    
    else if(character2.PONTOS > character1.PONTOS)
        console.log(`\n ${character2.NOME} venceu a corrida! Parabéns! 🏆`)
    
    else 
        console.log("A corrida terminou empatada!")
    
}
//função auto invocavel. Ira rodar assin que iniciar o arquivo.
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);
    
    // O operador await é utilizado para esperar por uma "Promise". Ele pode ser usado apenas dentro de uma async function. 
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);

})();

