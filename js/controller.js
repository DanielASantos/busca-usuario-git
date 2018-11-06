$("#dados-usuario").hide();
$("#lista-repos").hide();
$("#botao-busca").click(buscaUsuario);

//Busca o usuário pelo username do GitHub
function buscaUsuario(){
	var usuario = $("#gh-usuario").val();
	$.get("https://api.github.com/users/" + usuario, detalhesUsuario).fail(mensagemErro);
	$.get("https://api.github.com/users/"+ usuario + "/repos", listagemRepositorios).fail(mensagemErro);
}

//Apresenta na tela os dados do usuário
function detalhesUsuario(data){
	$("#dados-usuario").show();
	$("#lista-repos").show();
	$("#erro").hide();

	var avatar = $("#avatar").attr('src', data.avatar_url);
	var username = $("#username");
	var nome = $("#nome");
	var seguidores = $("#seguidores");
	var seguidos = $("#seguidos");
	var email = $("#email");
	var bio = $("#bio");

	username.text(data.login);
	nome.text(data.name);
	seguidores.text(data.followers);
	seguidos.text(data.following);
	email.text(data.email);
	bio.text(data.bio);	
}

//Apresenta na tela os repositórios do usuário
function listagemRepositorios(data){
	var repositorios = data;
	$("#listagem").empty();
	for (var i = 0, len = data.length; i < len; i++) {
		var repositoriosLista = $("<a href='#dados-repos' rel='modal:open' id=" + i + "></a></br>").text(data[i].name);
		$("#listagem").append(repositoriosLista);		   	
	}
	//Verifica qual repositório selecionado, e faz a busca dos dados do mesmo
	$("a").click((e) => {
       	var selecionado = $(e.target).attr('id');
    	$.get("https://api.github.com/repos/" + repositorios[selecionado].full_name, detalhesRepositorio)
	});
}



//Apresenta em um modal os dados do repositório selecionado
function detalhesRepositorio(data){
	var repositorio = $("#repositorio");
	var estrela = $("#estrela");
	var linguagem = $("#linguagem");
	var descricao = $("#descricao");
	var link = $("#link-repo").attr('href', data.html_url);

	repositorio.text(data.name);
	estrela.text(data.stargazers_count);
	linguagem.text(data.language);
	descricao.text(data.description);
	link.text(data.html_url);
}

//Apresenta mensagem, caso algum erro ocorra na busca
function mensagemErro () {
	$("#dados-usuario").hide();
	$("#lista-repos").hide();
	$("#erro").show();

}





