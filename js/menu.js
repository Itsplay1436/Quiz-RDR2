/**
 * QUIZ RED DEAD REDEMPTION 2 - menu.js
 * Arquivo responsável pela funcionalidade do menu de navegação
 * Contém efeitos de scroll e destaque de links ativos
 */

// Efeito de rolagem no header
window.addEventListener("scroll", function() {
    // Seleciona o elemento header do DOM usando seu ID
    let header = document.querySelector('#header');
    
    // Verifica se o header existe na página (para evitar erros)
    if (header) {
        /**
         * Alterna a classe 'roll' no header baseado na posição do scroll
         * classList.toggle(classe, condição) - adiciona a classe se a condição for true, remove se false
         * window.scrollY > 0 - retorna true quando a página foi rolada para baixo (scrollY > 0)
         */
        header.classList.toggle('roll', window.scrollY > 0);
    }
});

/**
 * Destacar link ativo na navegação
 * Este código executa quando o DOM está totalmente carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Obtém o nome da página atual a partir da URL
     * window.location.pathname - retorna o caminho da URL (ex: '/projeto/index.html')
     * .split('/') - divide o caminho em partes usando '/' como separador
     * .pop() - pega a última parte do array (o nome do arquivo)
     * || 'index.html' - fallback para 'index.html' se currentPage for vazio
     */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Seleciona todos os links de navegação dentro do menu
    const navLinks = document.querySelectorAll('.menu a');
    
    /**
     * Itera sobre cada link do menu
     * forEach - executa uma função para cada elemento do array
     */
    navLinks.forEach(link => {
        // Remove a classe 'ativo' de todos os links
        // Isso garante que apenas um link ficará ativo por vez
        link.classList.remove('ativo');
        
        /**
         * Verifica se o href do link corresponde à página atual
         * link.getAttribute('href') - obtém o valor do atributo href do link
         * === currentPage - compara se é igual ao nome da página atual
         */
        if (link.getAttribute('href') === currentPage) {
            // Se for a página atual, adiciona a classe 'ativo' para destacar o link
            link.classList.add('ativo');
        }
        
        /**
         * Caso especial para a página inicial (index.html)
         * Quando currentPage é vazio (''), significa que estamos na raiz do site
         * que normalmente carrega o index.html automaticamente
         */
        if (currentPage === '' && link.getAttribute('href') === 'index.html') {
            // Destaca o link da página inicial quando estamos na raiz
            link.classList.add('ativo');
        }
    });
});