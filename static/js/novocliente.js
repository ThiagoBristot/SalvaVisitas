document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('novoClienteForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const clienteNome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        const descricao = document.getElementById('descricao').value;

        fetch('/novo_cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: clienteNome,
                endereco: endereco,
                descricao: descricao
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.status);
            form.reset();
        })
        .catch(error => console.error('Error:', error));
    });
});