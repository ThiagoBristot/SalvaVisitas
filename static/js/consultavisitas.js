document.addEventListener('DOMContentLoaded', function() {
    fetch('/Vdata')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            data.forEach((item, index) => {
                const div = document.createElement('div');
                div.classList.add('visit-item');
                
                // Adicionando dados à div
                item.forEach((value, idx) => {
                    const ItemDiv = document.createElement('div');
                    ItemDiv.textContent = value;
                    div.appendChild(ItemDiv);
                });

                // Adicionar evento de clique
                div.addEventListener('click', () => {
                    openModal(item);
                });

                container.appendChild(div);
            });
        });
    
    // Modal functionality
    const modal = document.getElementById('visitaModal');
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
    document.getElementById('editVisitaForm').addEventListener('submit', function(event) {
        event.preventDefault();
        saveVisita();
    });

    // Handle delete button
    document.getElementById('deleteButton').addEventListener('click', function() {
        deleteVisita();
    });

    function openModal(item) {
        document.getElementById('modal_id').value = item[0];
        document.getElementById('modal_nome').value = item[1];
        document.getElementById('modal_endereco').value = item[2];
        document.getElementById('modal_descricao').value = item[3];
        document.getElementById('modal_preco').value = item[4];
            // Formatar a data no formato YYYY-MM-DD
        const formattedDate = new Date(item[5]).toISOString().split('T')[0];
        document.getElementById('modal_data').value = formattedDate;
        modal.style.display = 'block';
    }

    function saveVisita() {
        const visitaData = {
            id: document.getElementById('modal_id').value,
            nome: document.getElementById('modal_nome').value,
            endereco: document.getElementById('modal_endereco').value,
            descricao: document.getElementById('modal_descricao').value,
            preco: document.getElementById('modal_preco').value,
            data: document.getElementById('modal_data').value
        };

        fetch('/update_visita', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitaData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Visita atualizada com sucesso!');
                modal.style.display = 'none';
                location.reload(); // Recarregar a página para ver as alterações
            } else {
                alert('Erro ao atualizar visita');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function deleteVisita() {
        const visitaId = document.getElementById('modal_id').value;

        fetch('/delete_visita', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: visitaId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Visita excluída com sucesso!');
                modal.style.display = 'none';
                location.reload();
            } else {
                alert('Erro ao excluir visita');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
