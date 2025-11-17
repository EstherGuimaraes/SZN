let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const subtotalEl = document.getElementById("subtotal");
const tbody = document.querySelector("tbody");

function renderCarrinho() {
    tbody.innerHTML = "";

    carrinho.forEach((item, index) => {
        const totalItem = item.preco * item.quantidade;

        tbody.innerHTML += `
            <tr class="cart-item">
              <td class="product-info">
                <img src="${item.imagem}">
                <div>
                  <p class="product-title">${item.nome}</p>
                  <p>Cor: <span class="bold">${item.cor}</span></p>
                  <p>Tamanho: <span class="bold">${item.tamanho}</span></p>
                  <button class="remove" onclick="removerItem(${index})">🗑️</button>
                </div>
              </td>

              <td class="price">R$ ${item.preco.toFixed(2)}</td>

              <td class="quantity">
                <div class="quantity-controls">
                  <button class="qty-btn minus" onclick="alterarQtd(${index}, -1)">−</button>
                  <span class="qty">${item.quantidade}</span>
                  <button class="qty-btn plus" onclick="alterarQtd(${index}, 1)">+</button>
                </div>
              </td>

              <td class="total">R$ ${totalItem.toFixed(2)}</td>
            </tr>
        `;
    });

    atualizarSubtotal();
}

function alterarQtd(i, delta) {
    carrinho[i].quantidade += delta;

    if (carrinho[i].quantidade <= 0) {
        carrinho.splice(i, 1);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderCarrinho();
}

function removerItem(i) {
    carrinho.splice(i, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderCarrinho();
}

function atualizarSubtotal() {
    let total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    subtotalEl.textContent = `R$ ${total.toFixed(2)}`;
}



renderCarrinho();

document.getElementById("btnFinalizar").addEventListener("click", function() {
  window.location.href = "pagamento.html";
});

