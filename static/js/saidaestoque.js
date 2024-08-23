document.addEventListener('DOMContentLoaded', function() {
    const visitaModal = document.getElementById('visitaModal');
    const produtoModal = document.getElementById('produtoModal');
    const spanCloseVisita = document.querySelector('#visitaModal .close');
    const spanCloseProduto = document.querySelector('#produtoModal .close');

    document.getElementById('selecionarVisita').onclick = function() {
        visitaModal.style.display = 'block';
        loadVisitas();
    };

    document.getElementById('selecionarProduto').onclick = function() {
        produtoModal.style.display = 'block';
        loadProdutos();
    };

    spanCloseVisita.onclick = function() {
        visitaModal.style.display = 'none';
    };

    spanCloseProduto.onclick = function() {
        produtoModal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == visitaModal) {
            visitaModal.style.display = 'none';
        }
        if (event.target == produtoModal) {
            produtoModal.style.display = 'none';
        }
    };

    function loadVisitas() {
        fetch('/get_visitas')
            .then(response => response.json())
            .then(data => {
                const listaVisitas = document.getElementById('listaVisitas');
                listaVisitas.innerHTML = '';
                data.forEach(visita => {
                    const linhaDiv = document.createElement('div');
                    linhaDiv.className = 'linha-visita'; // Classe para estilizar a linha
    
                    const idDiv = document.createElement('div');
                    idDiv.className = 'coluna-id';
                    idDiv.textContent = visita.VisitaSequencia;
    
                    const nomeDiv = document.createElement('div');
                    nomeDiv.className = 'coluna-nome';
                    nomeDiv.textContent = visita.VisitaNome;
    
                    const descricaoDiv = document.createElement('div');
                    descricaoDiv.className = 'coluna-descricao';
                    descricaoDiv.textContent = visita.VisitaDescricao;
    
                    linhaDiv.appendChild(idDiv);
                    linhaDiv.appendChild(nomeDiv);
                    linhaDiv.appendChild(descricaoDiv);
    
                    linhaDiv.onclick = function() {
                        document.getElementById('visita_id').value = visita.VisitaSequencia;
                        visitaModal.style.display = 'none';
                    };
    
                    listaVisitas.appendChild(linhaDiv);
                });
            })
            .catch(error => console.error('Erro ao carregar visitas:', error));
    }
    
    function loadProdutos() {
        fetch('/get_produtos')
            .then(response => response.json())
            .then(data => {
                const listaProdutos = document.getElementById('listaProdutos');
                listaProdutos.innerHTML = '';
                data.forEach(produto => {
                    const linhaDiv = document.createElement('div');
                    linhaDiv.className = 'linha-produto'; // Classe para estilizar a linha
    
                    const idDiv = document.createElement('div');
                    idDiv.className = 'coluna-id';
                    idDiv.textContent = produto.ItemID;
    
                    const nomeDiv = document.createElement('div');
                    nomeDiv.className = 'coluna-nome';
                    nomeDiv.textContent = produto.ItemNome;
    
                    const quantDiv = document.createElement('div');
                    quantDiv.className = 'coluna-quantidade';
                    quantDiv.textContent = produto.ItemQuantidade;
    
                    const precoDiv = document.createElement('div');
                    precoDiv.className = 'coluna-preco';
                    precoDiv.textContent = produto.ItemPrecoU;
    
                    linhaDiv.appendChild(idDiv);
                    linhaDiv.appendChild(nomeDiv);
                    linhaDiv.appendChild(quantDiv);
                    linhaDiv.appendChild(precoDiv);
    
                    linhaDiv.onclick = function() {
                        document.getElementById('produto_id').value = produto.ItemID;
                        produtoModal.style.display = 'none';
                    };
    
                    listaProdutos.appendChild(linhaDiv);
                });
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }
    
});
