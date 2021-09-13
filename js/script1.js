class Produto {
  constructor() {
    this.id = 1;
    this.arraysProdutos = [];
    this.editId = null;
  }
  salvar(){
    let produto = this.lerDados();
    //console.log(produto)
    if(this.validaCampoInput(produto)){
        if(this.editId == null){
          this.adicionar(produto);
        } else{
          this.atualizar(this.editId, produto) ;
        }
    };

    //console.log(this.arraysProdutos)
    this.listaTabela();
    this.cancelar();

  }
  listaTabela(){
    let tbody = document.getElementById('tbody')
    tbody.innerText = '';
    for( let indice = 0; indice < this.arraysProdutos.length ; indice++){
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_nome = tr.insertCell();
        let td_valor = tr.insertCell();
        let td_acao = tr.insertCell();

        td_id.innerText = this.arraysProdutos[indice].idProduto;
        td_nome.innerText = this.arraysProdutos[indice].nomeProduto;
        td_valor.innerText = this.arraysProdutos[indice].valorProduto;
       
        td_id.classList.add('center');

        let imgEdit = document.createElement('img');
        let imgDelet = document.createElement('img');
        imgEdit.src = 'img/editar.png';
        imgDelet.src = 'img/bin.png';
        imgEdit.setAttribute('onclick','produto.editar('+ JSON.stringify(this.arraysProdutos[indice])+')') ;//converte o array em string
        imgDelet.setAttribute('onclick','produto.deletar('+this.arraysProdutos[indice].idProduto+')');
        td_acao.appendChild( imgEdit);
        td_acao.appendChild( imgDelet);
        // <td><img></td>
       
       


    }
  }
  adicionar(produto){
    produto.valorProduto = parseFloat(produto.valorProduto)
   this.arraysProdutos.push(produto);
   this.id++;
  }
  atualizar(id, produto){
    console.log(id)
    console.log(produto)
    for( let indice = 0; indice < this.arraysProdutos.length ; indice++){
      if(this.arraysProdutos[indice].idProduto == id){
        this.arraysProdutos[indice].nomeProduto = produto.nomeProduto;
        this.arraysProdutos[indice].valorProduto = produto.valorProduto;
     }
    }
  }
  lerDados(){
   let produto = {};
   produto.idProduto = this.id;
   console.log(produto.idProduto)
  
   produto.nomeProduto = document.getElementById('produto').value;
   produto.valorProduto = document.getElementById('valor').value;
  
   return produto
  }
  validaCampoInput(produto){
    let msg = '';
    if(produto.nomeProduto == ''){
      msg += 'Informe o nome do Produto. \n'
    }
    if(produto.valorProduto == ''){
      msg += 'Informe o valor do Produto. \n'
    }
    if(msg != ''){
      alert(msg);
      return false
    }
    return true
  }
  cancelar(){
    document.getElementById('produto').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('btn1').innerText = 'Salvar';
    this.editId = null;
  }
  
  editar(dados){
     this.editId = dados.idProduto;
     //console.log(this.editId)
     document.getElementById('produto').value = dados.nomeProduto;
     document.getElementById('valor').value = dados.valorProduto;
     document.getElementById('btn1').innerText = 'Atualizar';
  }
  
  deletar(id){
      let tbody = document.getElementById('tbody');
    for( let indice = 0; indice<this.arraysProdutos.length; indice++){
        if(this.arraysProdutos[indice].idProduto == id){
            this.arraysProdutos.splice(indice,1);
            tbody.deleteRow(indice);
      }
     
      console.log(this.arraysProdutos)
    }
 }
}

//instancio objeto atraves da classe Produto
var  produto = new Produto()
