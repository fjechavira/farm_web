// See https://kit.svelte.dev/docs/types#app
import type { User } from "$lib";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			session: User | null;
		}
	}
}

export {};
