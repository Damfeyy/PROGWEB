const precoProduto = 100;
const percentualDesconto = 15;
const nome = "Maria";

const valorDesconto = precoProduto * (percentualDesconto / 100);

const precoFinal = precoProduto - valorDesconto;

const precoAcimaDe100 = precoProduto > 100;

const descontoValido = percentualDesconto >= 0 && percentualDesconto <= 100;

console.log(`Olá, ${nome}! O produto custa R$ ${precoProduto}`);

console.log(`Desconto de ${percentualDesconto}%: R$ ${valorDesconto}`);

console.log(`Preço final: R$ ${precoFinal}`);

console.log(`Preço acima de R$ 100? ${precoAcimaDe100}`);

console.log(`Desconto válido? ${descontoValido}`);
