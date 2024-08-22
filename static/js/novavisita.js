document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('novaVisitaForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton) {
            const visitaData = {
                cliente_id: document.getElementById('cliente_id').value,
                nome: document.getElementById('nome').value,
                endereco: document.getElementById('endereco').value,
                descricao: document.getElementById('descricao').value,
                preco: document.getElementById('preco').value,
                data: document.getElementById('data').value
            };

            fetch('/nova_visita', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(visitaData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Visita salva com sucesso!');
                } else {
                    alert('Erro ao salvar a visita.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao salvar a visita.');
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('clienteModal');
    const btn = document.getElementById('selecionarCliente');
    const span = document.getElementsByClassName('close')[0];
    const listaClientes = document.getElementById('listaClientes');

    // Abrir o modal
    btn.onclick = function() {
        fetch('/clientes')
            .then(response => response.json())
            .then(data => {
                listaClientes.innerHTML = '';
                data.forEach(cliente => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${cliente.ClienteID}, Nome: ${cliente.ClienteNome}`;
                    li.setAttribute('data-id', cliente.ClienteID);
                    li.setAttribute('data-nome', cliente.ClienteNome);
                    li.setAttribute('data-endereco', cliente.Endereco);
                    li.addEventListener('click', function() {
                        document.getElementById('cliente_id').value = this.getAttribute('data-id');
                        document.getElementById('nome').value = this.getAttribute('data-nome');
                        document.getElementById('endereco').value = this.getAttribute('data-endereco');
                        modal.style.display = 'none';
                    });
                    listaClientes.appendChild(li);
                });
            });
        modal.style.display = 'block';
    }

    // Fechar o modal
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Fechar o modal clicando fora dele
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
});