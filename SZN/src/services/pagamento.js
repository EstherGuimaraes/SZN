const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const containerProduto = document.querySelector(".product");
const totalEl = document.querySelector(".total span");

if (carrinho.length > 0) {
    const item = carrinho[0];

    containerProduto.innerHTML = `
        <img src="${item.imagem}">
        <div class="product-info">
          <h3>${item.nome}</h3>
          <span>${item.cor}</span><br>
          <small>${item.tamanho}</small>
        </div>
        <p class="product-price">R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
    `;

    totalEl.textContent = `R$ ${(item.preco * item.quantidade).toFixed(2)}`;
}
