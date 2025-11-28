#!/bin/bash

# Script de verificação manual dos eventos adicionados

echo "Teste manual dos eventos - SZN"
echo "1) Login: acesse pagelogin.html"
echo "   - Clique em 'Cadastre-se' -> deve abrir register.html"
echo "   - Digite email inválido e saia do campo -> borda deve ficar vermelha"
echo "   - Pressione Enter no campo senha -> formulário deve enviar"

echo "2) Register: acesse register.html"
echo "   - Clique em 'Volte para fazer login' -> deve abrir pagelogin.html"
echo "   - Pressione Enter no campo senha -> formulário deve enviar"

echo "3) Painel de Denúncias: acesse paineldenuncias.html"
echo "   - Clique 'Nova Denúncia' -> modal abre"
echo "   - Clique no fundo escuro (overlay) -> modal fecha"

echo "4) Inicial: verifique botão do carrinho visível no cabeçalho"

echo "Fim do checklist"
