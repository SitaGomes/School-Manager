## Plano de Teste para o Sistema de Mérito

_1. Escopo e Objetivos_

_1.1 Escopo do Teste:_

O plano de teste abrangerá todos os módulos e funcionalidades do Sistema de Mérito, incluindo:

- _Módulo de Cadastro:_ Cadastro de alunos, professores e empresas parceiras.
- _Módulo de Gestão de Moedas:_ Distribuição de moedas pelos professores, consulta de extrato de moedas por alunos e professores.
- _Módulo de Vantagens:_ Cadastro de vantagens por empresas parceiras, consulta de vantagens por alunos e resgate de vantagens por alunos.
- _Módulo de Autenticação:_ Login e autenticação de alunos, professores e empresas parceiras.

_1.2 Objetivos do Teste:_

- _Verificar se o sistema atende aos requisitos funcionais:_ Assegurar que o sistema funcione de acordo com as funcionalidades especificadas na descrição do problema.
- _Validar a usabilidade do sistema:_ Avaliar se o sistema é fácil de usar, intuitivo e agradável para os usuários.
- _Garantir a confiabilidade do sistema:_ Verificar se o sistema é estável, livre de erros e capaz de lidar com diferentes situações de uso.
- _Testar o desempenho do sistema:_ Avaliar se o sistema responde rapidamente às solicitações dos usuários e se é capaz de lidar com um número crescente de usuários e transações.
- _Validar a segurança do sistema:_ Verificar se o sistema protege os dados dos usuários contra acesso não autorizado, modificação ou destruição.

_2. Análise dos Requisitos_

_2.1 Requisitos Funcionais:_

- _Módulo de Cadastro:_
  - O sistema deve permitir o cadastro de alunos, professores e empresas parceiras.
  - Os dados de cadastro dos alunos devem incluir nome, email, CPF, RG, Endereço, Instituição de Ensino e curso.
  - Os dados de cadastro dos professores devem incluir nome, CPF e departamento.
  - As empresas parceiras devem informar o nome da empresa, CNPJ, endereço e contato.
- _Módulo de Gestão de Moedas:_
  - Os professores devem poder distribuir moedas aos seus alunos.
  - O professor deve ter saldo suficiente para distribuir moedas.
  - O professor deve informar o aluno que receberá as moedas e o motivo da distribuição.
  - O aluno deve ser notificado por email ao receber moedas.
  - Alunos e professores devem poder consultar o extrato de suas contas, visualizando o total de moedas e as transações realizadas.
- _Módulo de Vantagens:_
  - As empresas parceiras devem poder cadastrar vantagens no sistema.
  - As vantagens devem ter nome, descrição, foto e custo em moedas.
  - Os alunos devem poder consultar as vantagens disponíveis.
  - Os alunos devem poder resgatar vantagens utilizando suas moedas.
  - Ao resgatar uma vantagem, o valor da vantagem deve ser descontado do saldo do aluno.
  - O aluno deve receber um email de cupom para utilizar na troca presencial da vantagem.
  - A empresa parceira deve receber um email com o código da troca para conferência.
- _Módulo de Autenticação:_
  - Alunos, professores e empresas parceiras devem ter um login e uma senha para acessar o sistema.
  - O sistema deve validar o login e a senha dos usuários.
  - O sistema deve permitir que os usuários alterem suas senhas.

_2.2 Requisitos Não Funcionais:_

- _Usabilidade:_ O sistema deve ser fácil de usar, intuitivo e agradável para os usuários.
- _Confiabilidade:_ O sistema deve ser estável, livre de erros e capaz de lidar com diferentes situações de uso.
- _Desempenho:_ O sistema deve responder rapidamente às solicitações dos usuários e ser capaz de lidar com um número crescente de usuários e transações.
- _Segurança:_ O sistema deve proteger os dados dos usuários contra acesso não autorizado, modificação ou destruição.

_3. Estratégia e Metodologia de Teste_

_3.1 Metodologia de Teste:_

O plano de teste seguirá a metodologia de teste ágil, que permite iterações contínuas e adaptações ao longo do processo de desenvolvimento.

_3.2 Técnicas de Teste:_

As seguintes técnicas de teste serão utilizadas:

- _Teste Funcional:_ Verificará se o sistema atende aos requisitos funcionais especificados.
- _Teste de Usabilidade:_ Avaliará a usabilidade do sistema para diferentes tipos de usuários.
- _Teste de Integração:_ Verificará se os diferentes módulos do sistema se integram corretamente.
- _Teste de Sistema:_ Verificará se o sistema atende aos requisitos não funcionais e se funciona de forma integrada.

_3.3 Ambiente de Teste:_

O ambiente de teste será simulado para replicar o ambiente de produção real. Isso incluirá:

- Um servidor web para hospedar o aplicativo.
- Um banco de dados para armazenar os dados do sistema.
- Clientes web para simular o acesso dos usuários ao sistema.

_4. Casos de Teste e Cenários_

_4.1 Casos de Teste:_

Serão criados casos de teste detalhados para cada funcionalidade do sistema. Os casos de teste incluirão:

- _Pré-condições:_ As condições que devem ser satisfeitas antes que o teste seja executado.
- _Etapas:_ As etapas a serem realizadas para executar o teste.
- _Resultados esperados:_ Os resultados que devem ser obtidos para que o teste seja considerado bem-sucedido.

_4.2 Cenários de Teste:_

Serão criados cenários de teste para simular o uso do sistema em situações reais. Os cenários de teste incluirão:

- _Perfil do usuário:_ O tipo de usuário que está executando a ação.
- _Ação:_ A ação que o usuário está tentando realizar.
- _Resultado esperado:_ O resultado que o usuário espera obter.

_5. Estimação de Esforço e Cronograma_

_5.1 Estimação de Esforço:_

O esforço necessário para realizar os testes será estimado com base na complexidade do sistema e na quantidade de testes a serem realizados.

_5.2 Cronograma:_

Será criado um cronograma detalhado para as atividades de teste, incluindo:

- Datas de início e término para cada fase de teste.
- Marcos importantes do projeto.
- Recursos alocados para cada fase de teste.

_6. Recursos e Ferramentas de Teste_

_6.1 Recursos:_

Os seguintes recursos serão necessários para realizar os testes:

- Testadores experientes em testes de software.
- Desenvolvedores do sistema para auxiliar na resolução de bugs.
- Especialistas em domínio para garantir que os testes sejam realistas.

_6.2 Ferramentas:_

As seguintes ferramentas de teste serão utilizadas:

- Uma ferramenta de gerenciamento de casos de teste para organizar e rastrear os casos de teste.
- Uma ferramenta de automação de teste para automatizar a execução de testes repetitivos.
- Uma ferramenta de registro de bugs para registrar e rastrear bugs encontrados durante o teste.

_7. Execução e Monitoramento_

_7.1 Execução dos Casos de Teste:_

Os casos de teste serão executados de acordo com o cronograma e os resultados serão documentados.

_7.2 Registro de Bugs e Defeitos:_

Bugs e defeitos encontrados durante o teste serão registrados e rastreados até que sejam corrigidos.

_7.3 Monitoramento do Progresso:_

O progresso do teste será monitorado regularmente para identificar gargalos e tomar medidas corretivas quando necessário.

_8. Relato e Análise de Resultados_

_8.1 Relato de Resultados:_

Um relatório de resultados detalhado será criado ao final do teste. O relatório incluirá:

- Uma descrição dos testes realizados.
- Os resultados dos testes.
- Bugs e defeitos encontrados.
- Métricas de qualidade do software.
- Recomendações para melhorias.

_8.2 Análise de Resultados:_

Os resultados dos testes serão analisados para identificar tendências, padrões e áreas de risco.

_9. Aceitação do Sistema_

O sistema só será aceito para uso em produção se atender a todos os requisitos de teste e se for considerado estável, confiável e seguro.

_10. Manutenção do Plano de Teste_

O plano de teste será mantido atualizado ao longo do ciclo de vida do sistema para refletir as mudanças no sistema e nos requisitos.
