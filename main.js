;(function(){
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFvxFZhqHelS9DOvjdMG9VQk9Ug1uvsRo",
    authDomain: "chat-aff4e.firebaseapp.com",
    databaseURL: "https://chat-aff4e.firebaseio.com",
    storageBucket: "chat-aff4e.appspot.com",
    messagingSenderId: "950037993437"
  };
  firebase.initializeApp(config);
  dataBase = firebase.database();
  boton  = document.getElementById('start-login');
  boton.addEventListener("click", googleLogin);
  window.addEventListener("unload",unLogin)

  usuario = null;
  usuariosConectados = null;
  conectadoKey = null;

  function googleLogin(){
  	var provider = new firebase.auth.GoogleAuthProvider();
  	firebase.auth().signInWithPopup(provider).then(function(result){
  		user = result.user;
  		$(".login").fadeOut();
  		initApp()
  	});
  }

  function initApp(){
  	usuariosConectados = dataBase.ref("/connected");
  	login(user.uid, user.email || user.displayName  );
  	usuariosConectados.on("child_added", addUser);
  	usuariosConectados.on("child_removed", removeUser);
  }

  function login(uid, nombre){
  	var conetado = usuariosConectados.push({
  		uid:uid,
  		name:name
  	});

  	conectadoKey = conetado.key 
  }

  function unLogin(){
  	dataBase.ref("/connected"+conectadoKey).remove();
  }

  function addUser(data){
  	var $li = $("<li>")
  		.addClass("collection-item")
  		.html(data.val().name)
  		.attr("id",data.val().uid)
  		.appendTo(".users");
  }

  function removeUser(data){

  }

})()