
# Projeto de Teste para QuikDev

Projeto criado para teste prático no sistema de cadastro de produtos

# Instalação

Para realizar a instalação é necessário executar o comando:

` npm install `

E para poder abrir a execução de testes terá que realizar o comando:

` npx cypress open `

Ou caso seja realizado já diretamente via terminal, pode ser utilizado a anotação 'pack' sendo repassada como varável de ambiente, com os valores 1, 2 e 3. Caso algum valor diferente deles for informado, é pegado o valor padrão que já está configurado na aplicação

` npx cypress run --env pack=1`


Na pasta de _*Relatório de Execução Manual*_
Contem os registros de execução de bateria de testes em cada uma das versões;


## Definição de Casos de Teste, Ferramentas e Modelos utilizados para automação e criação de casos de testes 

Nas 3 telas, foram utilizados os mesmos testes, visando uma maior abrangência a respeito das regras de negócio e validações realizadas pelo front e backend;

A ferramenta escolhida para a automação de testes foi o Cypress, visando a alta relevância do uso da ferramenta para testes web, além de estar com o modelo de Page Object, para facilitar a manutenção geral dos testes além de prover um maior controle dos .

E para a escrita dos casos de testes foi utilizado alguns modelos de Tabela de Decisão, Classe de Equivalência, Validação de Campos e Regras Cruzadas para especificar os casos de testes.
