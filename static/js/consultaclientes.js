document.addEventListener('DOMContentLoaded', function() {
    fetch('/Cdata')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            data.forEach((item) => {
                const div = document.createElement('div');
                div.classList.add('cliente-item');
                
                item.forEach((value, index) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.textContent = value;
                    div.appendChild(itemDiv);
                });

                // Adicionar evento de clique para abrir o modal
                div.addEventListener('click', () => {
                    openModal(item);
                });

                container.appendChild(div);
            });
        });
    
    // Modal functionality
    const modal = document.getElementById('clienteModal');
    const span = document.getElementsByClassName('close')[0];

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Handle form submission
    document.getElementById('editClienteForm').addEventListener('submit', function(event) {
        event.preventDefault();
        saveCliente();
    });

    // Handle delete button
    document.getElementById('deleteButton').addEventListener('click', function() {
        deleteCliente();
    });

    function openModal(item) {
        document.getElementById('modal_id').value = item[0];
        document.getElementById('modal_nome').value = item[1];
        document.getElementById('modal_endereco').value = item[2];
        document.getElementById('modal_descricao').value = item[3];
        modal.style.display = 'block';
    }

    function saveCliente() {
        const clienteData = {
            id: document.getElementById('modal_id').value,
            nome: document.getElementById('modal_nome').value,
            endereco: document.getElementById('modal_endereco').value,
            descricao: document.getElementById('modal_descricao').value
        };

        fetch('/update_cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Cliente atualizado com sucesso!');
                modal.style.display = 'none';
                location.reload(); // Recarregar a página para ver as alterações
            } else {
                alert('Erro ao atualizar cliente');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function deleteCliente() {
        const clienteId = document.getElementById('modal_id').value;
        fetch('/delete_cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: clienteId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Cliente excluído com sucesso!');
                modal.style.display = 'none';
                location.reload();
            } else {
                alert('Erro ao excluir cliente');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
