# Rinha de Frontend
 
Este é o repositório da Rinha de Frontend. Esta é uma brincadeira e um desafio de código inspirada pela "Rinha de Backend", uma iniciativa criada por Francisco Franceschi. O desafio consiste em montar um sistema Frontend com a stack que você quiser, e estressá-lo de acordo com as especificações abaixo, simplesmente pra ver o que acontece. Quem tirar a melhor performance nos critérios aqui estabelecidos, vence.
 
## O Desafio
 
Criar uma "JSON Tree Viewer": Um visualizador de JSON que roda sem backend, e que seja capaz de carregar um JSON especificado pelo usuário e exibí-lo. O sistema deve focar em ser capaz de exibir o maior JSON possível. O "usuário" poderá carregar o arquivo JSON que quiser, e ser capaz de visualizá-lo em forma de árvore conforme o layout: VER O LAYOUT NO FIGMA.
 
Neste repositório há uma pasta "json" com os arquivos de testes. Há alguns bem pequenos, outros enormes para a proposta. O layout diz respeito apenas ao output estático, e não versará sobre o comportamento de navegação do JSON que você carregar. Portanto, você é livre pra aplicar o comportamento e técnica que achar melhor para a navegação da sua tree view: paginação, infinite scrolling, lazy loading, vdom, windowing... E é aqui que começa a rinha: sua aplicação deve buscar carregar o maior arquivo possível dessa pasta. Boa sorte!
 
## Especificações
 
Você não precisa cumprir todos os critérios para entregar a sua aplicação. Faça o seu melhor, aprenda e divirta-se. Abaixo então os critérios de acordo com o peso de cada um.
 
1. Correctness: Esse é o critério principal e o único que é requisito de exclusão: A aplicação deve funcionar. Um JSON deve poder ser carregado e exibido conforme demonstrado no Layout (não necessarimanete precisa ser o maior JSON, mas ao menos alguns deles). `PESO: 50`.
 
2. Performance: Sua aplicação deve buscar o maior nível de fluidez, quanto mais rápida e robusta, melhor pra você. Aplicações com performance instável (as vezes quebra, as vezes vai, as vezes trava) não terão os pontos desse critério. `PESO: 25`.
 
4. Acessibilidade: Sua aplicação deverá ser o mais acessível que você puder (ideal que esteja completamente acessível). Deve ser possível navegar na sua tree view de maneira acessivel. `PESO: 12`.
 
3. Layout: Procure seguir o layout. Ele é extremamente simples e quase que completamente estático, faça o seu melhor! No entanto, sinta-se livre para fazer modificações que sejam necessárias para suportar payloads maiores ou melhorar a acessibilidade. `PESO: 7`.
 
Os critérios serão avaliados de acordo com uma regra de tudo ou nada: ou tem ou não tem. Se tiver, o peso do critério será somado ao score. Se não tiver, 0 será somado ao score.
 
### Análise
 
Para as análises utilizaremos:
 
- Performance: Time to Next Interaction (basicamente a velocidade da sua aplicação)
- Core Web Vitals
- Lighthouse Results
- Accessibility Checks
 
## Stack
 
Você pode utilizar a stack que desejar, a lib auxiliar que quiser, o framework que achar mais adequado... enfim, use o que quiser, desde que sua aplicação seja pure-client, ou seja: Todo o processamento deve ocorrer no Client (aqui não queremos dizer "na sua máquina", mas no Client do ponto de vista arquitetônico web), ou seja: independente da técnica utilizada, você não poderá utilizar processamento auxiliar server-side. No entanto, note: Você não pode submeter uma aplicação que clona alguma outra, ou utiliza alguma lib ou helper que resolva inteiramente o mesmo problema que a rinha propõe, o projeto deve ser criado por você.
 
## Arquivos de Teste
 
Sua aplicação deve ser capaz de rodar o máximo possível de arquivos de teste na pasta `json` deste projeto, carregando 1 por vez. Os arquivos disponíveis são:
 
- alltypes.json
- verysmall.json
- small.json
- pokedex.json
- startwitharray.json
- large.json
- giant.json
- invalid.json
- nullreference.json
 
## Submeter seu projeto
 
1. Crie um repositório público com sua aplicação
2. Crie seu projeto inteiramente neste repositório
3. Faça o deploy do seu projeto via Github Pages ou qualquer outro serviço de host de sua escolha
4. Abra uma issue no repositório original da "Rinha de Frontend" e preencha seus dados lá
 
Pront! Boa sorte, e que vença o melhor!
 
## Dúvidas, ajuda e sugestões
 
Para dúvidas, pedidos de ajuda ou sugestões, abra uma ISSUE nesse repositório prefixada por `[DÚVIDA]`, `[AJUDA]` ou `[SUGESTÃO]`.