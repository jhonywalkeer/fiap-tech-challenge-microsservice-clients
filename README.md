<br>
<div align="center">
    <a href="./docs/readme/pt-br/sobre-o-projeto.md"><img align="center" alt="Readme do projeto descrevendo do que se trata o mesmo entrando em detalhes técnicos" src="./docs/images/icons/flags/brazil-flag.svg"> Português Brasileiro (PT-BR) </a>|
    <a href="./docs/readme/en-us/readme.md"><img align="center" alt="Project readme describing what it is about, going into technical details" src="./docs/images/icons/flags/usa-flag.svg"> Inglês Americano (EN-US) </a>|
    <a href="/"><img align="center" alt="Readme del proyecto describiendo de qué se trata, entrando en detalles técnicos" src="./docs/images/icons/flags/spain-flag.svg"> Espanhol (ES-ES) </a>
</div>
<br>

Esse microsserviço faz parte do sistema que foi desenvolvido para ajudar lanchonetes e restaurantes a gerenciar de forma eficiente os pedidos dos clientes, automatizando o processo de pedidos e integrando-os diretamente com a cozinha e o sistema de estoque. Através desta API, você pode implementar um sistema de autoatendimento que melhora a experiência do cliente, reduz erros e aumenta a eficiência operacional, tendo com objetivo especificamente o gerenciamento de usuários (criação e listagem).

A aplicação como um todo possui 6 microserviços (contando com este) que são:

A aplicação é composta por 6 microsserviços, sendo eles:

- [fiap-tech-challenge-microsservice-employees]() - Microsserviço responsável por gerenciar os funcionários da aplicação.

- [fiap-tech-challenge-microsservice-categories]() - Microsserviço responsável por gerenciar as categorias dos produtos da aplicação.

- [fiap-tech-challenge-microsservice-products](https://github.com/jhonywalkeer/fiap-tech-challenge-microsservice-products) - Microsserviço responsável por gerenciar os produtos da aplicação.

- [fiap-tech-challenge-microsservice-orders](https://github.com/jhonywalkeer/fiap-tech-challenge-microsservice-orders) - Microsserviço responsável por gerenciar os pedidos da aplicação.

- [fiap-tech-challenge-microsservice-payments](https://github.com/jhonywalkeer/fiap-tech-challenge-microsservice-payments) - Microsserviço responsável por gerenciar os pagamentos da aplicação.

- [fiap-tech-challenge-microsservice-production-tracker](https://github.com/jhonywalkeer/fiap-tech-challenge-microsservice-production-tracker) - Microsserviço responsável por gerenciar a interface gráfica da aplicação.

A documentação do sistema (DDD) com Event Storming segue abaixo (escolha o sistema que você tem mais afinidade) lambrado que a documentação que foi feita no Miro e no Figjan estao exclusivamente em português brasileiro:

- **Miro**: https://miro.com/app/board/uXjVKLXulkE=/
- **Fijan**: https://www.figma.com/file/

## Sumário dos Conteúdos que podem ser encontrados neste README

- [Sobre o Projeto](./docs/readme/pt-br/sobre-o-projeto.md)
- [ADR's - Registros de decisão de arquitetura](./docs/readme/pt-br/adrs-do-projeto.md)
  - [ADR-001 - Arquitetura que será implementada no projeto](./docs/readme/pt-br/adrs/adr-001.md)
  - [ADR-002 - Escolha da linguagem de programação a ser utilizada]()
  - [ADR-003 - Escolha do tipo de banco de dados a ser utilizado]()
  - [ADR-004 - Escolha da cloud a ser utilizada]()
  - [ADR-005 - Decisão de utilização de testes unitários]()
  - [ADR-006 - Decisão de utilização de testes utilizando BDD]()
- [DocumentaDocumentação da API](./docs/readme/pt-br/documentacao-da-api.md)
  - [Swagger preview (descrição e detalhes dos dados escritos em protuguês brasileiro)](./docs/swagger/swagger-render-image.png)
  - [Endpoints](./docs/readme/pt-br/endpoints.md)
    - [Health](./docs/readme/pt-br/endpoints-do-health.md)
    - [Usuários](./docs/readme/pt-br/endpoints-dos-usuarios.md)
- [Tecnologias Utilizadas](./docs/readme/pt-br//tecnologias-utilizadas.md)
  - [Estrutura projeto (diretórios)]()
- [Executando o Projeto]()
  - [Pré-requisitos]()
  - [Executando o projeto]()
