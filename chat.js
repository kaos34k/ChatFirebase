Class Chat{
	constructor(roomKey, user, containerId, dataBase){
		this.roomKey= roomKey;
		this.user = user;
		this.containerId= containerId;
		this.dataBase = dataBase;
		this.buid_chat(this.id, containerId);
	}
}