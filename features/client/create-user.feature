Feature: Create user (client)
  As a user
  I want to create my profile
  So that I can be identified when using the system

Scenario: Creating a new user with valid data
  Given that I provide valid user data:
    | name             | email                     | social_security_number |
    | Usuário de Teste | usuario_teste@fiap.com.br | 761.638.630-03         |
  When I send a POST request to "/api/v1/users" with the data
  Then I should receive a status code 201 with the data

Scenario: Creating a new user with incorrect email
  Given that I provide invalid user data:
    | name             | email                      | social_security_number |
    | Usuário de Teste | usuario_teste@email.com.br | 761.638.630-03         |
  When I send a POST request to "/api/v1/users" with the data
  Then I should receive a status code 400 with the error message

Scenario: Creating a new user with incorrect social security number
  Given that I provide invalid user data:
    | name             | email                      | social_security_number |
    | Usuário de Teste | usuario_teste@email.com.br | 7638634                |
  When I send a POST request to "/api/v1/users" with the data
  Then I should receive a status code 400 with the error message

