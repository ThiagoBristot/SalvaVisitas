document.addEventListener('DOMContentLoaded', function() {
    fetch('/Cestoque')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            data.forEach((item) => {
                const div = document.createElement('div');
                div.classList.add('estoque-item');
                
                item.forEach((value, index) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.textContent = value;
                    div.appendChild(itemDiv);
                });

                container.appendChild(div);
            });
        });
});
