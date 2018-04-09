import { CloudAccount } from './cloud-account.model';

export class Credential {

    // Default constructor will be called by mapper
    constructor(){
		this.username = undefined;
		this.password = undefined;
	}

    username: string;
    password: string;
}
