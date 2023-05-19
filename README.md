
<h1>API de Controle de Estoque</h1>
<p>Essa é uma API em Node.js, que esta sendo desenvolvida com TypeScript, Prisma e MySQL, utilizando POO e testes com Vitest.</p>


<h2>Instalação </h2>

<ol>
<li>clone o repositório</li>
<li>Instale as dependências com o comando npm install</li>
<li>Crie um arquivo .env na raiz do projeto, seguindo o exemplo do arquivo .env.example, preenchendo as variáveis de ambiente de acordo com as suas configurações do MySQL.</li>
<li>Execute as migrations com o comando "npm run migrate" </li>
<li>Inicie o servidor com o comando npm run dev </li>
<ol>


<h2>Alguns Endpoints desenvolvidos</h2>

<h4>GET /stock <h4>
<p>retorna uma lista de produtos no estoque</p>
</br>
<h4>GET /stock/:name <h4/>

<p>retorna uma lista de produtos específica<p>

</br>

<h4>POST /stock </h4>

<p>Cria um novo produto<p>
  
  </br>
  
  <h4>PUT /stock </h4>

<p>Modifica um produto<p>
  
  </br>

