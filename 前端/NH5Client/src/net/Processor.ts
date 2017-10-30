module proto {
	export class Processor extends MessageHandle {
		public constructor() {
			super();
		}
		public handle(p: Pro) {
			if (this.commands[p.S]) {
				this.commands[p.S](p);
			}
		}
		public do_close() {
			console.log("与服务器断开连接");
		}
		public do_connect() {
			console.log("连接服务器成功");

			var msg_login:proto.c_Login=new proto.c_Login();
			msg_login.name=Config.username;
			msg_login.pass=Config.password;
			msg_login.isReLogin=false; 
			SocketManager.getInstance().sendProto(msg_login);

		}
	}
}