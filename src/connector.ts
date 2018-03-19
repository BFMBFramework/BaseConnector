import * as uuidv1 from "uuid/v1";

export abstract class Connector {
	protected name : string;
	protected connections : Array<Connection>;

	constructor(name : string) {
		this.name = name;
	}

	getName() : string {
		return this.name;
	}

	abstract addConnection(options : any, callback : Function) : void;

	getConnectionIndex(id : string) : number {
		return this.connections.findIndex((i : Connection) => { return i.getId() === id});
	}
	
	getConnection(id : string) : Connection {
		let index : number = this.getConnectionIndex(id);
		if (index > -1) {
			return this.connections[index];
		} else {
			return null;
		}
	}

	removeConnection(id : string, callback : Function) : void {
		let index : number = this.getConnectionIndex(id);
		if (index > -1) {
			this.connections.splice(index, 1);
			callback(null);
		} else {
			callback(new Error("No connection on list with id: " + id));
		}
	}

	abstract receiveMessage(id : string, options : any, callback : Function) : void;

	abstract sendMessage(id : string, options : any, callback : Function) : void;
}

export abstract class Connection {
	protected id : string;

	constructor (options : any) {
		this.id = uuidv1();
	}

	getId() : string {
		return this.id;
	}
}