export interface Session {
	accessToken: string;
	expiration: Date;
}

export interface SignIn {
	username: string | null;
	password: string | null;
}
