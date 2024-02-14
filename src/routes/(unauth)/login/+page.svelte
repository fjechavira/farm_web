<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	// Types and Models
	import type { ActionData } from '/$types';
	import type { SignIn } from '$lib/index';

	export let form: ActionData;

	let formSigIn: SignIn = {
		username: null,
		password: null
	};
	$: isValidUsername = formSigIn.username ? true : false;
	$: isValidPassword = formSigIn.password ? true : false;

	onMount(() => {
		const inputUsername = document.getElementById('username') as HTMLInputElement;
		inputUsername.focus();
	});
</script>


<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicia sesión con tu cuenta</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" method="POST" action="?/login" use:enhance>
        {#if form && form.messageValidation?.length}
                  <div class="sm:col-span-2">
                      <div class="rounded-md bg-red-50 p-4">
                          <div class="flex">
                              <div class="flex-shrink-0">
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="w-6 h-6 text-red-400"
                                  >
                                      <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                  </svg>
                              </div>
                              <div class="ml-3">
                                  <h3 class="text-md font-medium text-red-800">
                                      {form.messageValidation}
                                  </h3>
                              </div>
                          </div>
                      </div>
                  </div>
              {/if}
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Usuario</label>
          <div class="mt-2">
            <input
              id="username" 
              name="username" 
              type="text"
              placeholder="Usuario"
              autocomplete="off"
              bind:value={formSigIn.username}
              class={form && !isValidUsername 
                ? 'block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6' 
                : 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6' }>
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Contraseña"
              autocomplete="off"
              bind:value={formSigIn.password}
              class={form && !isValidPassword 
                ? 'block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6' 
                : 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6' }>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600">
            <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Recordarme</label>
          </div>
  
          <div class="text-sm leading-6">
            <a href="#" class="font-semibold text-emerald-600 hover:text-emerald-500">Olvide mi contraseña?</a>
          </div>
        </div>
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Iniciar Sesión</button>
        </div>
      </form>
    </div>
</div>
