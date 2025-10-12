---
subtitle: |
  Aluno: Renan Girardi Freitas\
  RM: 365950\
  Turma: 6FSDT
title: Tech Challenge -- Fase 2
---

# 1. Introdução

Este documento detalha a arquitetura, implementação e uso da aplicação de blogging desenvolvida como parte do Tech Challenge - Fase 02. O projeto visa fornecer uma solução tecnológica para um problema recorrente na educação pública, utilizando um backend robusto e escalável construído com Node.js.

## 1.1. O Problema

Atualmente, professores e professoras da rede pública de educação
enfrentam a carência de plataformas unificadas e eficientes para
compartilhar conteúdo educacional, como planos de aula e materiais de
apoio, com seus alunos. A ausência de uma ferramenta centralizada
dificulta o acesso ao conhecimento de forma prática e organizada,
criando uma barreira para a digitalização do ensino.

## 1.2. A Solução

Para endereçar essa questão, foi desenvolvida uma aplicação de blogging
dinâmico. Inicialmente ela foi prototipada na plataforma OutSystems, mas
nova arquitetura garante maior escalabilidade, flexibilidade e
performance. Os dados são agora persistidos em um banco de dados
PostgreSQL, e toda a aplicação é conteinerizada com Docker, assegurando
consistência entre os ambientes de desenvolvimento e produção e
facilitando o deploy. O resultado é uma plataforma robusta onde docentes
podem criar, editar e gerenciar postagens de conteúdo, e alunos podem
acessar e pesquisar esse material de forma intuitiva.

# 2. Arquitetura do Sistema

Esta seção descreve a arquitetura da aplicação, as tecnologias
selecionadas e a organização do código-fonte, fornecendo uma visão clara
da estrutura do projeto.

## 2.1. Visão Geral

A aplicação foi desenvolvida sobre a plataforma Node.js utilizando o
framework NestJS, que oferece uma arquitetura modular e escalável
baseada em TypeScript. A arquitetura segue um design em camadas,
separando claramente as responsabilidades:

- **Controllers:** Responsáveis por receber as requisições HTTP,
  validar os dados de entrada (DTOs - Data Transfer Objects) e invocar
  os serviços correspondentes.

- **Services:** Contêm a lógica de negócio da aplicação, interagindo
  com o banco de dados e processando as informações.

- **Entities/Repositories** (Camada de Dados): Utiliza o ORM TypeORM
  para mapear as entidades do código para as tabelas do banco de dados
  e gerenciar as operações de persistência.

Para a persistência dos dados, foi escolhido o banco de dados relacional
PostgreSQL, conhecido por sua robustez e confiabilidade. Todo o ambiente
de desenvolvimento e teste é conteinerizado com Docker e Docker Compose,
o que garante a portabilidade e a consistência do ambiente, facilitando
a configuração e a execução do projeto.

## 2.2. Tecnologias Utilizadas

- **Backend Framework:** NestJS

- **Linguagem:** TypeScript

- **Banco de Dados:** PostgreSQL

- **ORM (Object-Relational Mapping):** TypeORM

- **Validação de Dados:** class-validator e class-transformer para
  validação e transformação de DTOs.

- **Containerização:** Docker e Docker Compose.

- **Testes Unitários:** Jest Framework.

- **CI/CD (Integração e Deploy Contínuo):** GitHub Actions para
  automação de testes e Render para deploy.

## 2.3. Estrutura de Pastas

O projeto está organizado na seguinte estrutura de diretórios para
manter uma separação clara de responsabilidades:

```
.
├── .github
│ └── workflows
├── coverage
│ └── lcov-report
├── src
│ ├── config
│ ├── entities
│ ├── enum
│ ├── post
│ │ └── dto
│ ├── tests
│ └── user
│ └── dto
└── test
```

## 2.4. Modelagem de Dados

A aplicação utiliza duas entidades principais para a modelagem dos
dados, gerenciadas pelo TypeORM:

- **UserEntity:** Representa os usuários do sistema.

  - **id:** Identificador único (UUID) gerado automaticamente.

  - **username:** Nome do usuário (string, obrigatório).

  - **email:** E-mail do usuário (string, obrigatório, único).

  - **password:** Senha do usuário (string, obrigatório).

  - **profile:** Perfil do usuário (string, ex: \'student\',
    \'teacher\').

  - **createdAt, updatedAt, deletedAt:** Campos de data para
    controle de registros.

- **PostEntity:** Representa as postagens criadas pelos professores.

  - **id:** Identificador único (UUID) gerado automaticamente.

  - **title:** Título da postagem (string, obrigatório).

  - **content:** Conteúdo da postagem (string, obrigatório).

  - **createdAt, updatedAt, deletedAt:** Campos de data para
    controle de registros.

# 3. Guia de Instalação e Execução (Setup Inicial)

Este guia contém todas as instruções necessárias para configurar e
executar a aplicação em um ambiente de desenvolvimento local.

## 3.1. Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes softwares
instalados em sua máquina:

- **Git:** Para clonar o repositório.

- **Node.js:** Versão 20.x ou superior.

- **Docker:** Para gerenciamento de contêineres.

- **Docker Compose:** Para orquestrar os contêineres da aplicação e do
  banco de dados.

## 3.2. Instalação

Siga os passos abaixo para instalar o projeto e suas dependências:

Clone o repositório:

- _git clone https://github.com/renangirardi/blog-educa-be.git_

Acesse o diretório do projeto:

- _cd blog-educa-be_

Instale as dependências do Node.js:

- _npm install_

## 3.3. Configuração das Variáveis de Ambiente

A configuração da aplicação é gerenciada através de variáveis de
ambiente. A prática recomendada é usar um arquivo .env como fonte única
da verdade para o ambiente de desenvolvimento.

1.  **Crie o arquivo de configuração:** Na raiz do projeto, crie um novo
    arquivo chamado .env.

2.  **Preencha o arquivo .env:** Copie e cole o conteúdo abaixo no seu
    arquivo .env. Estes valores serão lidos pelo Docker Compose para
    configurar os contêineres.

## 3.4. Executando o Ambiente de Desenvolvimento

Com o arquivo .env configurado, você pode iniciar todo o ambiente
(aplicação + banco de dados) com um único comando.

1.  Construa as imagens e inicie os contêineres:

    a. Execute no terminal: _docker compose up \--build_

    b. Este comando lê o docker-compose.yml e o .env.

    c. Ele constrói a imagem da aplicação, baixa a imagem do PostgreSQL
    e inicia ambos os serviços.

    d. A flag \--build é recomendada na primeira execução ou após
    alterar o Dockerfile.

2.  Após a execução, a aplicação estará disponível e com hot-reloading
    ativado (alterações no código src reiniciarão o servidor
    automaticamente).

    a. API disponível em: **http://localhost:3000**

    b. Banco de dados acessível em: **localhost:5432**

## 3.5. Executando os Testes

O projeto possui um arquivo de configuração separado
(docker-compose.test.yml) para rodar os testes em um ambiente limpo e
isolado, garantindo que eles sejam consistentes e não dependam do seu
.env local.

1.  Execute a suíte de testes:

    a. _docker compose -f docker-compose.test.yml up \--build
    \--abort-on-container-exit_

    b. Este comando utiliza a configuração de teste para criar um banco
    de dados temporário, rodar todos os testes e, em seguida,
    encerrar os contêineres.

# 4. Guia de Uso da API (Endpoints)

A API RESTful da aplicação fornece endpoints para o gerenciamento de
postagens e usuários. Todas as respostas são retornadas no formato JSON.

## 4.1. Endpoints de Postagens (/posts)

Estes endpoints são responsáveis por todas as operações relacionadas às
postagens.

### Listar Todas as Postagens

Recupera uma lista com todas as postagens criadas.

- **Método:** GET

- **Endpoint:** /posts

- **Corpo da Requisição:** Nenhum.

- **Exemplo de Resposta de Sucesso (200 OK):**

## Criar uma Nova Postagem

Cria uma nova postagem. Requer que um título e conteúdo sejam
fornecidos.

- **Método:** POST

- **Endpoint:** /posts

- **Corpo da Requisição:**

```{=html}
<!-- -->
```

- **Exemplo de Resposta de Sucesso (201 Created):**

### Ler uma Postagem Específica

Busca e retorna uma postagem específica pelo seu ID.

- **Método:** GET

- **Endpoint:** /posts/:id

- **Parâmetros de Rota:**

  - id (string, obrigatório): O ID da postagem a ser recuperada.

- **Exemplo de Resposta de Sucesso (200 OK):**

- **Resposta de Erro (404 Not Found):** Retornada se nenhuma postagem
  for encontrada com o ID fornecido.

### Buscar Postagens por Palavra-Chave

Permite a busca de postagens por palavras-chave contidas no título ou no
conteúdo.

- **Método:** GET

- **Endpoint:** /posts/search/:query

- **Parâmetros de Rota:**

  - query (string, obrigatório): O termo a ser buscado.

- **Exemplo de Resposta de Sucesso (200 OK):**

### Editar uma Postagem Existente

Atualiza o título e/ou o conteúdo de uma postagem existente.

- **Método:** PUT

- **Endpoint:** /posts/:id

- **Parâmetros de Rota:**

  - id (string, obrigatório): O ID da postagem a ser editada.

- **Corpo da Requisição (parcial ou completo):**

- **Exemplo de Resposta de Sucesso (200 OK):**

### Excluir uma Postagem

Remove uma postagem específica do banco de dados.

- **Método:** DELETE

- **Endpoint:** /posts/:id

- **Parâmetros de Rota:**

  - id (string, obrigatório): O ID da postagem a ser excluída.

- **Exemplo de Resposta de Sucesso (200 OK):**

## 4.2. Endpoints de Usuários (/users)

Endpoints para o gerenciamento de usuários.

### Criar um Novo Usuário

Registra um novo usuário no sistema.

- **Método:** POST

- **Endpoint:** /users

- **Corpo da Requisição:**

- **Exemplo de Resposta de Sucesso (201 Created):**

- **Resposta de Erro (400 Bad Request):** Retornada se os dados de
  entrada forem inválidos (ex: e-mail em formato incorreto, senha
  curta).

### Listar Todos os Usuários

Recupera uma lista com todos os usuários cadastrados.

- **Método:** GET

- **Endpoint:** /users

- **Exemplo de Resposta de Sucesso (200 OK):**

### Editar um Usuário Existente

Atualiza os dados de um usuário (nome, e-mail ou perfil).

- **Método:** PATCH

- **Endpoint:** /users/:id

- **Parâmetros de Rota:**

  - id (string, obrigatório): O ID do usuário a ser editado.

- **Corpo da Requisição (parcial):**

- **Exemplo de Resposta de Sucesso (200 OK):**

### Excluir um Usuário

Remove um usuário específico do sistema.

- **Método:** DELETE

- **Endpoint:** /users/:id

- **Parâmetros de Rota:**

  - id (string, obrigatório): O ID do usuário a ser excluído.

- **Exemplo de Resposta de Sucesso (200 OK):**

# 5. Qualidade de Código e Automação

Para garantir a estabilidade, manutenibilidade e confiabilidade da
aplicação, o projeto adota práticas rigorosas de qualidade de código e
automação de processos (CI/CD).

## 5.1. Cobertura de Testes

O projeto estabeleceu como requisito técnico uma cobertura mínima de 20%
do código por testes unitários. Essa meta foi significativamente
superada, demonstrando o compromisso com a qualidade.

A estratégia de testes foi focada nas camadas de maior complexidade e
lógica de negócio: Controllers, Services e DTOs (Data Transfer Objects).
Foram criados testes para validar:

- A lógica de negócio nos serviços.

- O comportamento dos controllers ao receber requisições.

- As regras de validação dos DTOs.

Com uma cobertura total de 81.64%, o projeto cumpre o requisito mínimo
solicitado na atividade. A cobertura de 0% em arquivos como main.ts e
\*.module.ts é intencional, pois estes contêm principalmente código de
configuração e boilerplate gerado pelo framework, cuja lógica já é
testada pelo próprio NestJS.

## 5.2. Integração e Deploy Contínuo (CI/CD)

### Integração Contínua (CI) com GitHub Actions

O repositório está configurado com um workflow de Integração Contínua
que é acionado a cada push ou pull request nas branches master e
develop. O pipeline executa automaticamente a suíte de testes em um
ambiente Docker limpo, garantindo que novas alterações não introduzam
regressões.

A execução dos testes é orquestrada pelo docker-compose.test.yml.

### Deploy Contínuo (CD) com Render

O deploy da aplicação em produção é automatizado através da plataforma
Render, que está conectada ao repositório do GitHub. A cada push na
branch master, o Render inicia um novo processo de build e deploy:

2.  O Render detecta a alteração na branch master.

3.  Constrói a imagem Docker de produção a partir do Dockerfile.

4.  Publica a nova imagem em seu registro interno.

Realiza o deploy da nova versão, substituindo a anterior sem tempo de
inatividade (zero-downtime).

# 6. Relato de Experiências e Desafios

Este projeto foi uma jornada de aprendizado intensivo, especialmente por
representar pra mim uma transição de uma base consolidada em
desenvolvimento Front-end para o universo do Backend.

A experiência mais gratificante durante o desenvolvimento foi, sem
dúvida, o aprofundamento no framework NestJS. Vindo de uma trajetória
com amplo conhecimento em Angular, descobrir um framework de backend tão
inspirado em sua arquitetura foi um fator de grande motivação. A
familiaridade com conceitos como módulos, injeção de dependência e o uso
de TypeScript permitiu uma adaptação mais fluida, tornando a curva de
aprendizado menos íngreme. Foi empolgante poder aplicar um modelo mental
já conhecido para construir um lado completamente novo de uma aplicação,
o que acelerou o desenvolvimento e tornou a experiência muito mais
prazerosa.

O maior desafio técnico do projeto foi a compreensão e aplicação da
tecnologia de contêineres com Docker e Docker Compose. Sendo um conceito
totalmente novo para mim, a abstração de criar ambientes de
desenvolvimento isolados, portáteis e consistentes exigiu um estudo
aprofundado e muita experimentação.

Durante o processo, surgiram obstáculos práticos que se tornaram grandes
momentos de aprendizado, como:

- Configurar a comunicação de rede entre os contêineres da aplicação e
  do banco de dados, superando erros de conexão (ECONNREFUSED).

- Garantir a persistência dos dados do banco de dados através de
  volumes nomeados.

- Implementar o hot-reloading de forma eficiente para que as
  alterações no código fossem refletidas em tempo real no contêiner.

A depuração desses problemas e a otimização dos arquivos Dockerfile e
docker-compose.yml foram etapas cruciais que solidificaram o
entendimento sobre o ciclo de vida de uma aplicação moderna.

Ao final, o Tech Challenge foi fundamental para a minha transição para
uma mentalidade Fullstack. Além de consolidar a habilidade de construir
APIs robustas com Node.js, o projeto proporcionou uma compreensão
prática sobre a importância de um ambiente de desenvolvimento bem
estruturado, a automação de testes (CI) e o deploy contínuo (CD). A
jornada, embora desafiadora, resultou em um crescimento profissional
significativo, construindo a base necessária para desenvolver, testar e
implantar aplicações de ponta a ponta.
