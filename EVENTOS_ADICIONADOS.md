# 📋 Eventos Adicionados ao Frontend - SZN

Resumo das alterações voltadas a eventos e UX.

- `SiteDenuncia/src/services/login.js`
  - Adicionado listener no link "Cadastre-se" para navegação controlada.
  - Validação de e-mail em `blur` e `focus` (feedback visual).
  - Permite envio do formulário pressionando `Enter` no campo senha.

- `SiteDenuncia/src/services/register.js`
  - Adicionado listener no link "Volte para fazer login".
  - Permite envio do formulário com `Enter` no campo de senha.

- `SiteDenuncia/src/pages/paineldenuncias.html`
  - Página restaurada e integrada com `denuncias-handler.js`.
  - Modal de nova denúncia com fechamento ao clicar no overlay.

- `SZN/src/sytles/inicial.css`
  - Ajustes para tornar o botão do carrinho visível (padding, tamanho da imagem, container `.icone`).

Como testar: abrir as páginas (`pagelogin.html`, `register.html`, `paineldenuncias.html`, `inicial.html`) no navegador e validar os comportamentos citados.
