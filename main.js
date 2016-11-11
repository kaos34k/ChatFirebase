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
  rooms = null;

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
  	rooms = dataBase.ref("/rooms");

  	login(user.uid, user.email || user.displayName  );
  	usuariosConectados.on("child_added", addUser);
  	usuariosConectados.on("child_removed", removeUser);
  }

  function login(uid, nombre){
  	var conetado = usuariosConectados.push({
  		uid:uid,
  		name:nombre
  	});

  	conectadoKey = conetado.key 
  }

  function unLogin(){
  	dataBase.ref("/connected"+conectadoKey).remove();
  }

  function addUser(data){
  	friend_id = data.val().uid;
  	var $li = $("<li>")
  		.addClass("collection-item")
  		.html(data.val().name)
  		.attr("id",friend_id)
  		.appendTo(".users");
	
	$li.on("click", function(){
		var room = rooms.push({
			creator:user.uid,
			friend:friend_id
		});
	});
  }

  function removeUser(data){
  	$("#"+data.val().uid).slideUp("fast", function (){
  		$(this).remove();
  	});
  }

})()