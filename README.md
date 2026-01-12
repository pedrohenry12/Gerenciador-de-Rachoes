
```md
# 🏆 Gerenciador de Rachões

Sistema desenvolvido para **gerenciar rachões de futsal/futebol**, permitindo organizar jogos, controlar presença de jogadores e administrar valores arrecadados de forma simples e eficiente.

Este projeto faz parte de um estudo prático envolvendo **frontend, backend, banco de dados, ORM e deploy em nuvem**.

---

## 🚀 Tecnologias utilizadas

### 🖥️ Frontend
- **React**
- **TypeScript**
- **HTML5**
- **CSS3**
- **Vercel** (deploy do frontend)

### 🧠 Backend
- **Node.js**
- **Express**
- **TypeScript**
- **Render** (deploy do backend)

### 🗄️ Banco de Dados
- **PostgreSQL**
- **Prisma ORM**
- **Neon** (PostgreSQL serverless na nuvem)

---

## 📂 Estrutura do repositório

```

Gerenciador-de-Rachoes/
├── Backend/
│   ├── prisma/
│   ├── src/
│   └── package.json
├── Frontend/
│   ├── src/
│   └── package.json
├── Diagrama/
├── Prototipação/
└── .gitignore

````

- **Backend**: API, regras de negócio e conexão com o banco  
- **Frontend**: Interface do usuário  
- **Prisma**: Modelagem e acesso ao banco de dados  
- **Diagrama**: Diagramas do sistema  
- **Prototipação**: Protótipos das telas  

---

## 📌 Funcionalidades

✔️ Cadastro de rachões  
✔️ Cadastro de jogadores  
✔️ Controle de presença  
✔️ Cálculo de valor por jogador  
✔️ Visualização de saldo total  
✔️ Organização simples e intuitiva  

---

## 🛠️ Como rodar o projeto localmente

### 🔹 Clonar o repositório

```bash
git clone https://github.com/pedrohenry12/Gerenciador-de-Rachoes.git
cd Gerenciador-de-Rachoes
````

---

### 🔹 Backend

```bash
cd Backend
npm install
```

#### Configurar variáveis de ambiente (`.env`)

```env
DATABASE_URL="postgresql://usuario:senha@host:porta/banco"
```

#### Rodar migrations do Prisma

```bash
npx prisma migrate dev
```

#### Iniciar o servidor

```bash
npm run dev
```

---

### 🔹 Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

---

## 🧬 Prisma

* O **Prisma** é utilizado como ORM para:

  * Modelagem do banco de dados
  * Criação de migrations
  * Consultas seguras e tipadas

Comandos úteis:

```bash
npx prisma studio
npx prisma migrate dev
npx prisma generate
```

---

## ☁️ Deploy

### 🌐 Neon

* Hospedagem do banco **PostgreSQL**
* Conexão via variável `DATABASE_URL`

### 🚀 Render

* Deploy do **backend**
* Integração direta com GitHub

### ⚡ Vercel

* Deploy do **frontend**
* Build automático a cada push

---

## 🤝 Contribuições

Contribuições são bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit (`git commit -m 'feat: nova funcionalidade'`)
4. Envie um Pull Request

---

## 📄 Licença

Este projeto ainda não possui uma licença definida.

---

## 📫 Autor

Desenvolvido por **Pedro Henry**
Projeto com fins educacionais e práticos.

---

⚽ **Gerencie seu rachão sem dor de cabeça!** ⚽

```
