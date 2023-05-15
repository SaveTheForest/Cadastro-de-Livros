

function getBookList() {

    fetch('http://localhost:3000/livros')
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('bookList');
            data.forEach(book => {
                const listItem = document.createElement('li');
                listItem.textContent = `Nome: ${book.nome} | Preço: ${book.preco} | Descrição: ${book.descricao}`;
                bookList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

async function postBookList() {
    document
        .getElementById("bookForm")
        .addEventListener("submit", async function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const preco = document.getElementById("preco").value;
            const descricao = document.getElementById("descricao").value;

            const bookData = {
                nome: nome,
                preco: preco,
                descricao: descricao,
            };
            fetch("http://localhost:3000/livros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            })

                .catch((error) => {
                    console.error("Erro:", error);
                });
        });


    location.reload()

}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch(error => {
                console.error('Erro ao registrar o Service Worker:', error);
            });
    });
}


document.addEventListener("DOMContentLoaded", getBookList);