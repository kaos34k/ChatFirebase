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
		$.tmpl($("#hidden-template"), {id: this.id})
			.appendTo("#"+containerId);
			this.ref = this.dataBase.ref("/messages/"+this.id)
	}

	setEvents(){
		$("#"+this.id).find("form").on("submit", (ev)=>{
			ev.preventDefault();
			var msm = $(ev.target).find(".mensaje-content").val();
			console.log(msm);
			this.send(msm);

			return false;
		});
	} 

	send(msm){
		this.ref.push({
			name: this.user.displayName || this.user.email,
			roomId: this.id,
			msm: msm
		});
	}
}