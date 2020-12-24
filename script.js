$(document).ready(() => {

    // Requisição para atualizar um produto existente
    $("#atualizar").on('click', () => {
        if (($("#id").val() > 0) && ($("#nome").val() !== "") && ($("#preco").val() > 0)) {

            let url = 'https://rest-api-gabrielbels.herokuapp.com/produtos';

            $.ajax({
                url: url,
                type: 'PATCH',
                dataType: 'JSON',
                data: {
                    id_produto: $("#id").val(),
                    nome: $("#nome").val(),
                    preco: $("#preco").val()
                },
                success: (data) => {
                    $("#resposta").html(`<p>${data.mensagem}</p>
                    <p>Novos dados do produto atualizado:</p>
                    <p id="get">
                    ID: ${data.produto_atualizado.id_produto}<br>
                    Nome: ${data.produto_atualizado.nome} <br>
                    Preço: ${data.produto_atualizado.preco}</p>`);

                    $("#id").val('');
                    $("#nome").val('');
                    $("#preco").val('');
                },
                error: (err) => {
                    $("#resposta").html('');
                    if (err.status == 404) {
                        alert('Não existem produtos com este ID.');
                    } else {
                        alert(`${err.status} - ${err.statusText}`);
                    }
                }
            });
        } else {
            alert('Preencha todos os campos para atualizar o produto.');
        }
    });

    // Requisição para criar um produto
    $("#criar").on('click', () => {
        if (($("#nome").val() !== "") && ($("#preco").val() > 0)) {

            let url = 'https://rest-api-gabrielbels.herokuapp.com/produtos';

            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'JSON',
                data: {
                    id_produto: $("#id").val(),
                    nome: $("#nome").val(),
                    preco: $("#preco").val()
                },
                success: (data) => {
                    $("#resposta").html(`<p>${data.mensagem}</p>
                    <p>Dados do produto criado: </p>
                    <p id="get">
                    ID: ${data.produto_criado.id_produto}<br>
                    Nome: ${data.produto_criado.nome} <br>
                    Preço: ${data.produto_criado.preco}</p>`)

                    $("#id").val('');
                    $("#nome").val('');
                    $("#preco").val('');
                },
                error: (err) => {
                    $("#resposta").html('');
                    alert(`${err.status} - ${err.statusText}`);
                }
            });
        } else {
            alert('Preencha o nome e o preço para inserir um novo produto.');
        }
    });

    $("#consultar").on('click', () => {
        if (($("#id").val() != 0)) {

            let url = 'https://rest-api-gabrielbels.herokuapp.com/produtos/' + $("#id").val();

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'JSON',
                data: { id_produto: $("#id").val() },
                success: (data) => {
                    console.log(data);
                    $("#resposta").html(`<p>${data.mensagem}</p>
                    <p>Dados do produto consultado: </p>
                    <p id="get">
                    ID: ${data.produto.id_produto}<br>
                    Nome: ${data.produto.nome} <br>
                    Preço: ${data.produto.preco}</p>`);

                    $("#id").val('');
                    $("#nome").val('');
                    $("#preco").val('');
                }, error: (err) => {
                    $("#resposta").html('');
                    if (err.status == 404) {
                        alert('Não existem produtos com este ID.');
                    } else {
                        alert(`${err.status} - ${err.statusText}`);
                    }
                }
            })
        } else {

            let url = 'https://rest-api-gabrielbels.herokuapp.com/produtos/';

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'JSON',
                success: (data) => {
                    console.log(data.produtos[0].produto.nome);
                    $("#resposta").html(`<p>${data.mensagem}</p>
                    <p>Dados dos produtos consultados:</p>`);
                    data.produtos.forEach(objProd => {

                        let id = objProd.produto.id_produto;
                        let nome = objProd.produto.nome;
                        let preco = objProd.produto.preco;

                        $("#resposta").append(`
                        <p id="get">ID: ${id}<br>
                        Nome: ${nome} <br>
                        Preço: ${preco}</p>`);
                    });
                    $("#id").val('');
                    $("#nome").val('');
                    $("#preco").val('');
                }
            })


        }
    });
    $("#deletar").on('click', () => {
        let url = 'https://rest-api-gabrielbels.herokuapp.com/produtos/';

        $.ajax({
            url: url,
            type: 'DELETE',
            dataType: 'JSON',
            data: { id_produto: $("#id").val() },
            success: (data) => {
                $("#resposta").html(`<p>${data.mensagem}</p>`);
                $("#id").val('');
                $("#nome").val('');
                $("#preco").val('');
            },
            error: (err) => {
                $("#resposta").html('');
                if (err.status == 404) {
                    alert('Não existem produtos com este ID.');
                } else {
                    alert(`${err.status} - ${err.statusText}`);
                }
            }
        })
    });
});