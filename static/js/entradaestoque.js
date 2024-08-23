document.getElementById('entradaEstoqueForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const formData = {
        produto_nome: document.getElementById('produto_nome').value,
        descricao: document.getElementById('descricao').value,
        quantidade: document.getElementById('quantidade').value,
        preco_unitario: document.getElementById('preco_unitario').value,
    };

    fetch('/entradaestoque', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Produto adicionado com sucesso!');
            window.location.href = '/estoquemenu';
        } else {
            alert('Erro ao adicionar produto.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao adicionar produto.');
    });
});
