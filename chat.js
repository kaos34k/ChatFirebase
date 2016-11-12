class Chat{
	constructor(roomKey, user, containerId, dataBase){
		this.roomKey= roomKey;
		this.user = user;
		this.containerId= containerId;
		this.dataBase = dataBase;
		this.buidChat(containerId);
		this.setEvents();
	}

	buidChat(containerId) {
		$.tmpl($("#hidden-template"), {id: this.roomKey})
			.appendTo("#"+containerId);
			this.ref = this.dataBase.ref("/messages/"+this.roomKey);

	}

	setEvents(){
		$("#"+this.roomKey).find("form").on("submit", (ev)=>{
			ev.preventDefault();
			var msm = $(ev.target).find(".mensaje-content").val();
			
			this.send(msm);

			return false;
		});

		this.ref.on("child_added", (data)=> this.add(data) );
	} 

	add(data){
		var mensaje = data.val();
		var html = `
					<b>${mensaje.name}</b>
					<span>${mensaje.msg}<span>
					`
	  	var $li = $("<li>")
			  		.addClass("collection-item")
			  		.html(html);
  		$("#"+this.roomKey).find("messages").appendTo($li);
			  			
	}

	send(msm){	
		
		this.ref.push({
			name: this.user.displayName || this.user.email,
			roomID: this.roomKey,
			msm: msm
		});
	}
}