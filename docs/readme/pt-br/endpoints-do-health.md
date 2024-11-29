## Endpoints do Health

### Qual a finalidade do endpoint Health?

O endpoint Health é utilizado para verificar se a aplicação está funcionando corretamente. Ele é um endpoint de monitoramento que retorna um status 200 OK se a aplicação estiver funcionando corretamente. Caso contrário, ele retorna um status ou `503 Service Unavailable` caso os **1 dos componentes** que sao importantes para o funcionamento da API nao esteja disponivel ou `500 Internal Server Error` caso a aplicação esteja com algum problema interno.

### Quais são os métodos HTTP permitidos?

O endpoint Health aceita apenas o método HTTP GET.

### Endpoints

**<p><img align="center" alt="Readme do projeto descrevendo do que se trata o mesmo entrando em detalhes técnicos" src="../../images/icons/methods/get-method.png" width='45px'> /health </p>**

| Pametros | Tipo | Valor | Descrição |
| -------- | ---- | ----- | --------- |
| N/A      | N/A  | N/A   | Inteiro   |
