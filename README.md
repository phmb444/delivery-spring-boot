### Como Rodar o Projeto

Para rodar o projeto "delivery-spring-boot", siga os seguintes passos:

1. **Pré-requisitos**:
   - Node.js (versão 20.12.1)
   - Docker (opcional, para rodar o projeto em um contêiner)

2. **Clonar o repositório**:
   ```
   git clone https://github.com/phmb444/delivery-spring-boot.git
   cd delivery-spring-boot
   ```

3. **Instalar dependências**:
   ```
   npm install
   ```

4. **Rodar o projeto em modo de desenvolvimento**:
   ```
   npm run dev
   ```

5. **Construir o projeto para produção**:
   ```
   npm run build
   ```

6. **Rodar o projeto em modo de produção**:
   ```
   npm start
   ```

7. **Usar Docker (opcional)**:
   - Construir a imagem Docker:
     ```
     docker build -t delivery-spring-boot .
     ```
   - Rodar o contêiner Docker:
     ```
     docker run -p 3000:3000 delivery-spring-boot
     ```

### Estrutura do Projeto

A estrutura principal do projeto é a seguinte:

- **package.json**: Arquivo de configuração do npm, que inclui as dependências e scripts necessários para rodar e construir o projeto.
- **Dockerfile**: Arquivo de configuração para construir a imagem Docker do projeto.
- **src/**: Diretório contendo o código-fonte do projeto.
  - **pages/**: Contém as páginas da aplicação Next.js.
  - **public/**: Contém arquivos estáticos acessíveis publicamente.
  - **styles/**: Contém arquivos de estilo (CSS).

### Detalhes Adicionais

- O projeto usa Next.js como framework principal.
- As dependências principais incluem React e TailwindCSS.
- O projeto expõe a aplicação na porta 3000.

Para mais detalhes, consulte os arquivos [package.json](https://github.com/phmb444/delivery-spring-boot/blob/main/package.json) e [Dockerfile](https://github.com/phmb444/delivery-spring-boot/blob/main/Dockerfile).
