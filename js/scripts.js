/**
 * Função para inclusão de novos clientes na base de dados.
 * 
 * @function:newCliente
 * @description:Inclui novos registro na base de dados 
 * fazendo uma chamada à função postCliente 
 * que faz um POST a partir do endpoint cliente na rota app.cliente.
 * 
 *   
 * @newNome {String} Obrigatorio 
 * @newCnpj {String} Obrigatorio
 * @newEndereco {String} Obrigatorio
 *     
 * @returns Não possui retorno. 
 */

const newCliente = () => {
  let newNome = document.getElementById("newNome").value;
  let newCnpj = document.getElementById("newCnpj").value;
  let newEndereco = document.getElementById("newEndereco").value;
  if (newNome === '') {
    alert("Atenção! O campo nome é de preenchimento obrigatório.");
  } else if ((newCnpj==="") || (newEndereco ==="")) {
    alert("Atenção! Os campos CNPJ ( Formato: 99.999.999/9999-99 ) e Endereço são de preechimento obrigatório.");
  } else {
      postCliente(newNome, newCnpj, newEndereco)
  }
}


/**
 * Função para edição de clientes na base de dados.
 * 
 * @function:editarCliente
 * @description:Editar novos registro na base de dados 
 * fazendo uma chamada à função putCliente 
 * que faz um POST a partir do endpoint cliente na rota app.cliente.
 * 
 *   
 * @newNome {String} Obrigatorio 
 * @newCnpj {String} Obrigatorio
 * @newEndereco {String} Obrigatorio
 *     
 * @returns Não possui retorno. 
 */

const editarCliente = () => {
  let newNome = document.getElementById("newNome").value;
  let newCnpj = document.getElementById("newCnpj").value;
  let newEndereco = document.getElementById("newEndereco").value;
  alert('Apenas os campos nome e Endereço serão alterados')
  
  if (newNome === '') {
      alert("Atenção! O campo nome é de preenchimento obrigatório.");
  } else if ((newCnpj==="") || (newEndereco ==="")) {
      alert("Atenção! Os campos CNPJ ( Formato: 99.999.999/9999-99 ) e Endereço são de preechimento obrigatório.");
  } else {
      putCliente(newNome, newCnpj, newEndereco);
      newCnpj.getElementById('newCnpj').setAttribute('readonly', false)
  }
}


/**
 * Função para deleção de clientes da tela do usuário.
 * 
 * @function:removeElement
 * @description:Deleta a linha na tabela e chama a função  
 * deleteCliente que faz a deleção na base de dados 
 * a partir do endpoint cliente na rota app.cliente
 * com o uma requisição delete.
 * 
 * 
 * cnpj {String} Obrigatorio
 *     
 * @returns Não possui retorno. 
 */

const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const cnpj = div.getElementsByTagName('td')[1].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteCliente(cnpj);
        alert("CNPJ:" + cnpj + " foi removido com sucesso!");
        location.reload()
        }
      }
  }
}


/**
 * Função para fazer um POST na base de dados com novos cliente.
 * 
 * @function:postCliente
 * @description:Inlui um registro na base de dados via POST é chamando pela 
 * função newCliente.
 * 
 * 
 * @newNome {String} Obrigatorio 
 * @newCnpj {String} Obrigatorio
 * @newEndereco {String} Obrigatorio
 *     
 * @returns Não possui retorno. 
 */

const postCliente = async (newNome, newCnpj, newEndereco) => {
  const formData = new FormData();
  formData.append('nome', newNome);
  formData.append('cnpj', newCnpj);
  formData.append('localizacao', newEndereco);
  
  let url = 'http:/127.0.0.1:5000/cliente';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => {
        //Adiciona um cliente à lista se a persistência dos dados retornar OK.  
        if (response.ok) {
          insertList(newNome, newCnpj, newEndereco);
          alert("Cliente adicionado!")
        }
        else{
          alert("Cliente já presente na base de dados!")
        }
        response.json();
        })

      .catch((error) => {
        console.error('Error:', error);
      });
  }


/**
 * Função para fazer um PUT na base de dados para edição de clientes.
 * 
 * @function:putCliente
 * @description:Edita um registro na base de dados via PUT é chamando pela 
 * função editCliente.
 * 
 * 
 * @newNome {String} Obrigatorio 
 * @newCnpj {String} Obrigatorio
 * @newEndereco {String} Obrigatorio
 *     
 * @returns Não possui retorno. 
 */
 
  const putCliente = async (newNome, newCnpj, newEndereco) => {
    
    const formData = new FormData();
    formData.append('nome', newNome);
    formData.append('cnpj', newCnpj);
    formData.append('localizacao', newEndereco);
  
    let url = 'http:/127.0.0.1:5000/cliente';
    fetch(url, {
      method: 'put',
      body: formData
    })
      .then((response) => {
        //Adiciona um cliente à lista se a persistência dos dados retornar OK.  
        if (response.ok) {
          alert("Cliente Editado!");
          location.reload()
        }
        else{
          alert("Cliente não existe na base de dados!")
        }
        response.json();
        })

      .catch((error) => {
        console.error('Error:', error);
      });
  }


/**
 * Função para inserir o novo registro na tela do usuário.
 * 
 * @function:putCliente
 * @description:Insere um registro tela do usuários depois que ele é salvo na base de dados.
 * 
 * 
 * @newNome {String} Obrigatorio 
 * @newCnpj {String} Obrigatorio
 * @newEndereco {String} Obrigatorio
 *     
 * @returns Não possui retorno. 
 */

const insertList = (newNome, newCnpj, newEndereco) => {
    var cliente = [newNome, newCnpj, newEndereco]
    var table = document.getElementById('TabelaCliente');

    var row = table.insertRow();
    for (var i = 0; i < cliente.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = cliente[i];
    }
    editButton(row.insertCell(3))
    closeButton(row.insertCell(4))
    document.getElementById("newNome").value = "";
    document.getElementById("newCnpj").value = "";
    document.getElementById("newEndereco").value = "";  
    removeElement()
  }


/**
 * Função 
 * 
 * @function:closeButton
 * @description:Insere um botão de close na tabela de cliente apresentada ao usuário.
 * Este botão chama a função removeElement que faz a deleção da linha na tela.
 * 
 *     
 * @returns Não possui retorno. 
 */
const closeButton = (parent) => {
  let btn = document.createElement("button");
  let txt = document.createTextNode("\u00D7");
  btn.className = "close";
  btn.appendChild(txt);
  parent.appendChild(btn);
}


/**
 * Função 
 * 
 * @function:editButton
 * @description:Insere um botão de edição na tabela de cliente apresentada ao usuário.
 * 
 *     
 * @returns Não possui retorno. 
 */

const editButton = (parent) => {
  let btn = document.createElement("btn");
  let img = document.createElement('img');
  img.src = ("https://cdn-icons-png.flaticon.com/16/1159/1159633.png");
  btn.className = "edit";
  btn.appendChild(img);
  btn.addEventListener("click", editCliente);
  parent.appendChild(btn);
  editCliente();
}


/**
 * Função 
 * 
 * @function:deleteCliente
 * @description:Faz um fetch passando o método delete para deletar um cliente da base.
 * 
 *     
 * @returns response.json. 
 */

const deleteCliente = (cnpj) => {
console.log(cnpj)
let url = 'http://127.0.0.1:5000/cliente?cnpj=' + cnpj;
fetch(url, {
  method: 'delete'
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}


/**
 * Função listar os clientes
 * 
 * @function:getClientes
 * @description:Faz um fetch passando o método get para trazer todos os clientes da base
 * e aprensetar na tela do usuário .
 * 
 *     
 * @returns data.clientes que é iterado pela função insertList. 
 */
const getClientes = async () => {
  let url = 'http://127.0.0.1:5000/clientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.clientes.forEach(cliente => insertList(cliente.nome, cliente.cnpj, cliente.localizacao))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/**
 * Função para editar um cliente
 * 
 * @function:editCliente
 * @description: Pega os valores da linha clicada e preenche nos campos de input box da tela 
 * para que o cliente faça a edição.
 * 
 *     
 * @returns Não possui 
 */

const editCliente = () => {
   let edit = document.getElementsByClassName("edit");
   let i;
   for (i = 0; i < edit.length; i++) {
     edit[i].onclick = function () {
       //Pega os valores da linha clicada
       let linha = this.parentElement.parentElement;
       let nome = linha.getElementsByTagName('td')[0].innerHTML;
       let cnpj = linha.getElementsByTagName('td')[1].innerHTML;
       let localizacao =linha.getElementsByTagName('td')[2].innerHTML;
       let botaoAdd = document.getElementById('addBtn');
       let botaoEdit = document.getElementById('editBtn');
       let botaoDesist = document.getElementById('desistBtn');
       
       //Preenche os input text com o valor da linha clicada 
       document.getElementById('newNome').value = nome;
       document.getElementById('newCnpj').value = cnpj;
       document.getElementById('newEndereco').value = localizacao;
       document.getElementById('newCnpj').setAttribute('readonly', true);
       document.getElementById('newCnpj').style.color = "red";
       document.getElementById('newCnpj').style.fontWeight = "bold";
       botaoAdd.style.display = "none";
       botaoEdit.removeAttribute("hidden");
       botaoDesist.removeAttribute("hidden");
       }
     }
   }

/**
 * Função para Desisti editar um cliente
 * 
 * @function:DesistirEditarCliente
 * @description: Permite que o usuário desista de uma edição
 * 
 *     
 * @returns Não possui 
 */

   const desistirEditarCliente = () => {
    location.reload();
   }


/**
 * Função para formatar cnpj
 * 
 * @function:function formatarCNPJ

 * @description: Permite que o customizar o formato do cnpj
 * 
 *     
 * @returns cnpj formatado 99.999.999/9999-99
 */

   function formatarCNPJ() {
    // Remove caracteres não numéricos
    let cnpj = document.getElementById("newCnpj").value.replace(/\D/g, '');
    // Adiciona pontos e traço de formatação
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');

    // Atualiza o valor do input
    document.getElementById("newCnpj").value = cnpj;
}


/**
 * Função para fazer o append da função formata cnpj ao input correspondente
 * 
 * @function:function appendFuncao

 * @description: Permite que o customizar o input cnpj adicionando uma função para mascara do cnpj
 * 
 *     
 * @returns não possui
 */

const appendFuncao = async () => {
document.getElementById('newCnpj').addEventListener('input', () => {
  var input = this.value;
  this.value = formatarCNPJ(input);
});
}



/**
 * Função para fazer a inicialização das funções no load da página
 * 
 * @function:function inicializaFuncoes

 * @description: Permite que o customizar o load e execução de algumas funções async no carregamento da página
 * 
 *     
 * @returns não possui
 */

const inicializaFuncoes = async () => {
  getClientes();
  appendFuncao();
}
