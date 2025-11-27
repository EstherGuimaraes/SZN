

const buyBtn = document.querySelector(".buy-btn");

buyBtn.addEventListener("click", () => {

    const produto = {
        nome: "Jaqueta Bomber Feminina - Suki",
        preco: 225.00,
        cor: document.querySelector(".color-box").innerText,
        tamanho: document.querySelector(".size.active").innerText,
        imagem: "../assets/Casaco 1.png",
        quantidade: 1
    };

    localStorage.setItem("carrinho", JSON.stringify([produto]));

    window.location.href = "/SZN/src/pages/carrinho.html";
});
