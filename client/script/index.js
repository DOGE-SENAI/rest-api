function pegarLivros(button){
    axios.get('http://localhost:3001/livros')
    .then(response => {
        showData(response.data);
    })
}

const enviarDados = () => {
    const nome = document.getElementById("nome").value;
    const autor = document.getElementById("autor").value;
    const ano = document.getElementById("ano").value;
    const img = document.getElementById("img").value;

    axios.post('http://localhost:3001/livro/add', {
        nome: nome,
        autor: autor,
        ano: ""+ano,
        img: img
    });

    setInterval(() => {
        window.location.reload(true);
    }, 1000);
}

const showData = (result) => {
    for(const livro in result) {
        const div = document.getElementById("container-main");

        const div2 = document.createElement("div");
        const button = document.createElement("button");
        const img = document.createElement("img");
        img.src += result[livro]["imagem"];

        div2.innerText = "Título: " + result[livro]["nome"] + "\n" +
                        "Autor: " + result[livro]["autor"] + "\n" +
                        "Data de publicação: " + result[livro]["ano"] + "\n" +
                        "\n" +
                        "ID: " + result[livro]["id"];
        div2.classList += "borda";
        
        button.innerText = "Deletar";
        button.style.marginLeft = "10px";
        button.onclick = () => {
            axios.delete(`http://localhost:3001/livro/delete/${result[livro]["id"]}`);
            
            window.location.reload(true);
        }

        div2.appendChild(img);
        div2.appendChild(button);
        div.appendChild(div2);
    }
}

pegarLivros();