/**
 * QUIZ RED DEAD REDEMPTION 2 - quiz.js
 * Arquivo responsável pela lógica do sistema de quiz
 * Contém validação de respostas, cálculo de pontuação e exibição de resultados
 */

// Respostas corretas do quiz
const respostasCorretas = {
    pergunta1: 'b', // 1899 - Ano em que RDR2 se passa
    pergunta2: 'a', // John Marston - Personagem resgatado no início
    pergunta3: 'd', // Valentine - Primeira cidade visitada
    pergunta4: 'd', // Tuberculose - Causa da morte do Arthur
    pergunta5: 'a', // Guarma - Ilha do capítulo 5
    pergunta6: 'b', // Bill Williamson - Primeiro alvo de John no RDR1
    pergunta7: 'c', // 16 - Número de animais lendários caçáveis
    pergunta8: 'c', // 36 - Idade do Arthur durante RDR2
    pergunta9: 'd', // Hosea Matthews - Companheiro na caça ao urso lendário
    pergunta10: 'b' // Moonshine - Bebida produzida em Lemoyne
};

/**
 * Mensagens de resultado baseadas na pontuação
 * Objeto onde cada chave é a pontuação e o valor é a mensagem correspondente
 */
const mensagensResultado = {
    10: "Parabéns! Você é um verdadeiro especialista em Red Dead Redemption 2!",
    9: "Excelente! Você conhece muito bem o mundo de RDR2!",
    8: "Muito bom! Você tem um bom conhecimento sobre o jogo.",
    7: "Bom trabalho! Você sabe bastante sobre RDR2.",
    6: "Resultado decente! Você conhece o básico do jogo.",
    5: "Resultado mediano. Talvez seja hora de revisitar o jogo!",
    4: "Você precisa jogar mais Red Dead Redemption 2!",
    3: "Hmm, talvez seja hora de uma nova jogatina!",
    2: "Você claramente não é um fã hardcore do jogo.",
    1: "Quase nenhum acerto. Tem certeza que já jogou RDR2?",
    0: "Nenhum acerto. Está na hora de conhecer esse jogo incrível!"
};

/**
 * Função para scroll suave para o topo
 * Utilizada para melhorar a experiência do usuário após ações no quiz
 */
function scrollParaTopo() {
    window.scrollTo({
        top: 0,           // Posição vertical 0 (topo da página)
        behavior: 'smooth' // Animação suave instead de salto instantâneo
    });
}

/**
 * Inicialização quando o DOM estiver totalmente carregado
 * Garante que todos os elementos HTML existam antes de manipular
 */
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Verificação de segurança - só executa o código se estiver na página do quiz
     * Evita erros caso este script seja carregado em outras páginas
     */
    if (!document.getElementById('form-quiz')) {
        return; // Sai da função se não encontrar o formulário do quiz
    }
    
    /**
     * SELEÇÃO DE ELEMENTOS DO DOM
     * Armazena referências aos elementos HTML para manipulação posterior
     */
    const btnLimpar = document.getElementById('limpar-respostas');
    const btnVerResultados = document.getElementById('ver-resultados');
    const btnTentarNovamente = document.getElementById('tentar-novamente');
    const divResultado = document.getElementById('resultado');
    const spanAcertos = document.getElementById('acertos');
    const divMensagemResultado = document.getElementById('mensagem-resultado');
    
    /**
     * EVENTO PARA LIMPAR RESPOSTAS
     * Botão que desmarca todas as opções selecionadas
     */
    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            // Seleciona todos os inputs de rádio do formulário
            const radios = document.querySelectorAll('input[type="radio"]');
            
            // Percorre cada radio button e desmarca
            radios.forEach(radio => {
                radio.checked = false;
            });
            
            // Leva o usuário de volta ao topo do quiz
            scrollParaTopo();
        });
    }
    
    /**
     * EVENTO PARA VER RESULTADOS
     * Botão que calcula e exibe a pontuação do usuário
     */
    if (btnVerResultados) {
        btnVerResultados.addEventListener('click', function() {
            // Calcula quantas respostas estão corretas
            const pontuacao = calcularPontuacao();
            // Exibe o resultado na tela
            exibirResultado(pontuacao);
        });
    }
    
    /**
     * EVENTO PARA TENTAR NOVAMENTE
     * Botão que reinicia o quiz após ver os resultados
     */
    if (btnTentarNovamente) {
        btnTentarNovamente.addEventListener('click', function() {
            // Esconde a div de resultados
            divResultado.style.display = 'none';
            
            // Limpa todas as respostas selecionadas
            const radios = document.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                radio.checked = false;
            });
            
            // Retorna ao topo do quiz
            scrollParaTopo();
        });
    }
    
    /**
     * FUNÇÃO PARA CALCULAR A PONTUAÇÃO
     * Percorre todas as perguntas e conta quantas respostas estão corretas
     * @returns {number} Número de acertos (0-10)
     */
    function calcularPontuacao() {
        let acertos = 0; // Contador de respostas corretas
        
        // Loop através das 10 perguntas (1 a 10)
        for (let i = 1; i <= 10; i++) {
            // Cria o nome da pergunta (ex: "pergunta1", "pergunta2", etc.)
            const pergunta = `pergunta${i}`;
            
            // Encontra o radio button selecionado para esta pergunta
            const respostaSelecionada = document.querySelector(`input[name="${pergunta}"]:checked`);
            
            /**
             * Verifica se:
             * 1. Há uma resposta selecionada (respostaSelecionada existe)
             * 2. A resposta selecionada é igual à resposta correta
             */
            if (respostaSelecionada && respostaSelecionada.value === respostasCorretas[pergunta]) {
                acertos++; // Incrementa o contador de acertos
            }
        }
        
        return acertos; // Retorna o total de acertos
    }
    
    /**
     * FUNÇÃO PARA EXIBIR O RESULTADO
     * Mostra a pontuação e mensagem correspondente na tela
     * @param {number} pontuacao - Número de acertos (0-10)
     */
    function exibirResultado(pontuacao) {
        // Verificação de segurança - só prossegue se todos os elementos existirem
        if (!spanAcertos || !divMensagemResultado || !divResultado) return;
        
        // Atualiza o span com o número de acertos
        spanAcertos.textContent = pontuacao;
        
        /**
         * Seleciona a mensagem correspondente à pontuação
         * Usa operador lógico OR para fallback caso pontuação seja inválida
         */
        let mensagem = mensagensResultado[pontuacao] || "Resultado inesperado!";
        divMensagemResultado.textContent = mensagem;
        
        // Torna a div de resultados visível
        divResultado.style.display = 'block';
        
        // Rolagem suave até a seção de resultados
        divResultado.scrollIntoView({ behavior: 'smooth' });
    }
});