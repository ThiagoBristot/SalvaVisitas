let div_count = 0
document.addEventListener('DOMContentLoaded', function() {
    fetch('/Cdata')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            data.forEach(item => {
                div_count += 1
                const div = document.createElement(`div`);
                div.id = `${div_count}`;
                //CRIAR DIV PARA CADA ITEM 
                for (let index = 0; index < item.length; index++) {
                    const ItemDiv = document.createElement(`div`);
                    ItemDiv.id = `i${index}`
                    const textContent = document.createTextNode(`${item[index]}`);
                    ItemDiv.appendChild(textContent)
                    div.appendChild(ItemDiv)
                }
                container.appendChild(div);
            });
        });
});


document.getElementById('botaovoltar').addEventListener('click', function() {
    window.location.href = '/';
});
