import ProductPage from '../support/ProductPage';

describe('Cadastro de Produto - Testes Detalhados', () => {
    const productPage = new ProductPage();

    beforeEach(() => {
          // Busca os valores válidos do config
    const validValues = Cypress.config('env').validValues;

    // Pega o valor da variável customVar passada via CLI ou usa o valor padrão do cypress.config.js
    let customVar = Cypress.env('customVar') || Cypress.config('env').customVar;

    // Verifica se o valor de customVar está no range de valores válidos
    if (!validValues.includes(customVar)) {
      customVar = Cypress.config('env').customVar; // Se não for válido, pega o valor padrão
    }
        cy.readFile('cypress/fixtures/teste'+customVar+'.html').then((htmlContent) => {
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
      
            cy.visit(url);         
        });

    });

    // Cadastrar um produto com todos os campos preenchidos de forma correta
    it('Cadastrar um produto com todos os campos preenchidos corretamente', () => {
        productPage.enterProductName('Produto Correto');
        productPage.enterProductValue('100');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('Produto cadastrado com sucesso').should('be.visible');
    });

    // Cadastrar um produto com o campo de Nome do Produto com caractere especial
    it('Cadastrar um produto com o nome contendo caracteres especiais', () => {
        productPage.enterProductName('Produto@Especial!');
        productPage.enterProductValue('50');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('Caractere especial no nome do produto não permitido').should('be.visible');
    });

    // Cadastrar um produto com o campo de Nome do Produto vazio
    it('Cadastrar um produto com o nome vazio', () => {
        productPage.enterProductName('');
        productPage.enterProductValue('50');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('O nome do produto é obrigatório').should('be.visible');
    });

    // Cadastrar um produto com o campo de Nome do Produto duplicado
    it('Cadastrar um produto com nome duplicado', () => {
        productPage.enterProductName('Produto Duplicado');
        productPage.enterProductValue('50');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('Produto cadastrado com sucesso').should('be.visible');

        // Tentando cadastrar o mesmo produto novamente
        productPage.enterProductName('Produto Duplicado');
        productPage.enterProductValue('50');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('Nome do produto já existe').should('be.visible');
    });

    // Cadastrar um produto com o valor superior a 0 (Zero)
    it('Cadastrar um produto com valor superior a 0', () => {
        productPage.enterProductName('Produto Valor Positivo');
        productPage.enterProductValue('10');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('Produto cadastrado com sucesso').should('be.visible');
    });

    // Cadastrar um produto com o valor igual a 0 (Zero)
    it('Cadastrar um produto com valor igual a 0', () => {
        productPage.enterProductName('Produto Valor Zero');
        productPage.enterProductValue('0');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('O valor do produto não pode ser zero').should('be.visible');
    });

    // Cadastrar um produto com o valor inferior a 0 (Zero)
    it('Cadastrar um produto com valor inferior a 0', () => {
        productPage.enterProductName('Produto Valor Negativo');
        productPage.enterProductValue('-10');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('O valor do produto não pode ser negativo').should('be.visible');
    });

    // Tentar colocar letras no campo de valor
    it('Tentar colocar letras no campo de valor', () => {
        productPage.enterProductName('Produto Valor Letra');
        productPage.enterProductValue('abc');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('O valor deve ser numérico').should('be.visible');
    });

    // Cadastrar um produto com validade inferior a 31/12/2021
    it('Cadastrar um produto com validade inferior a 31/12/2021', () => {
        productPage.enterProductName('Produto Vencido');
        productPage.enterProductValue('50');
        productPage.enterExpirationDate('2020-12-31');
        productPage.submitForm();

        cy.contains('Produto cadastrado com sucesso').should('be.visible');
    });

    // Cadastrar um produto com validade igual a 31/12/2021
    it('Cadastrar um produto com validade igual a 31/12/2021', () => {
        productPage.enterProductName('Produto Validade Limite');
        productPage.enterProductValue('50');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('Produto cadastrado com sucesso').should('be.visible');
    });

    // Cadastrar um produto com validade posterior a 31/12/2021
    it('Cadastrar um produto com validade posterior a 31/12/2021', () => {
        productPage.enterProductName('Produto Validade Inválida');
        productPage.enterProductValue('50');
        productPage.enterExpirationDate('2022-01-01');
        productPage.submitForm();

        cy.contains('A data de vencimento não pode ser maior que 31/12/2021').should('be.visible');
    });

    // Tentar colocar texto no campo de data
    it('Tentar colocar texto no campo de data', () => {
        productPage.enterProductName('Produto Data Texto');
        productPage.enterProductValue('50');
        productPage.enterExpirationDate('data-invalida');
        productPage.submitForm();

        cy.contains('Formato de data inválido').should('be.visible');
    });

    // Tentar Cadastrar um produto com valor inferior a zero e data posterior a 31/12/2021
    it('Cadastrar um produto com valor negativo e data posterior a 31/12/2021', () => {
        productPage.enterProductName('Produto Valor Data Inválidos');
        productPage.enterProductValue('-10');
        productPage.enterExpirationDate('2022-01-01');
        productPage.submitForm();

        cy.contains('O valor do produto não pode ser negativo').should('be.visible');
        cy.contains('A data de vencimento não pode ser maior que 31/12/2021').should('be.visible');
    });

    // Tentar Cadastrar um produto com valor inferior a zero e data igual a 31/12/2021
    it('Cadastrar um produto com valor negativo e data igual a 31/12/2021', () => {
        productPage.enterProductName('Produto Valor Zero Data Limite');
        productPage.enterProductValue('-10');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('O valor do produto não pode ser negativo').should('be.visible');
    });

    // Tentar cadastrar um produto sem nenhum dado inserido
    it('Cadastrar um produto sem nenhum dado inserido', () => {
        productPage.submitForm();

        cy.contains('O nome do produto é obrigatório').should('be.visible');
        cy.contains('O valor do produto é obrigatório').should('be.visible');
        cy.contains('A data de vencimento é obrigatória').should('be.visible');
    });

    // Tentar cadastrar um produto sem valor
    it('Cadastrar um produto sem valor', () => {
        productPage.enterProductName('Produto Sem Valor');
        productPage.enterExpirationDate('2021-12-31');
        productPage.submitForm();

        cy.contains('O valor do produto é obrigatório').should('be.visible');
    });

    // Tentar cadastrar um produto sem data de validade
    it('Cadastrar um produto sem data de validade', () => {
        productPage.enterProductName('Produto Sem Data');
        productPage.enterProductValue('50');
        productPage.submitForm();

        cy.contains('A data de vencimento é obrigatória').should('be.visible');
    });
});
