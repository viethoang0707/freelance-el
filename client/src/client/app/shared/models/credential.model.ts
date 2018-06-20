
export class Credential {

    // Default constructor will be called by mapper
    constructor(){
		this.username = undefined;
        this.password = undefined;
        this.cloud_code = undefined;
	}

    username: string;
    password: string;
    cloud_code: string;
}
