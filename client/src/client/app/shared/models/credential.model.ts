import { CloudAccount } from './cloud-account.model';

export class Credential {

    // Default constructor will be called by mapper
    constructor(){
		this.username = undefined;
		this.password = undefined;
		this.cloud_account = new CloudAccount();
	}

    username: string;
    password: string;
    cloud_account: CloudAccount;
}
