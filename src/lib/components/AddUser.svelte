<script lang="ts">
    // Models and Types
	import type { AddUser } from "$lib/index";
    // Libraries
	import { createEventDispatcher } from "svelte";


    export let isOpen: boolean = false;
    export let title: string = "";
    export let urlApi: string = "";

    let formUser: AddUser = {
        nombre : null,
        usuario : null,
        password : null,
        idPerfil : null
    };
    let submit:boolean = false;
    const dispatch = createEventDispatcher();
    const profiles: number[] = [1,2,3];

    function onClose(message: string) {
        isOpen = !isOpen;
        submit = false;
        formUser = {
            nombre : null,
            usuario : null,
            password : null,
            idPerfil : null
        };
               
        const detail = {isOpen, message};
        dispatch("eventSlideAddUser", detail);
    }

    async function onSubmit() {
        submit = true;

        if (!formUser.usuario || !formUser.password || !formUser.nombre || !formUser.idPerfil) {
            return;
        }

        if (!validatePassword(formUser.password))
        {
            return;
        }

        console.log(`Body Request AddUser - ${JSON.stringify(formUser)}`);

        const response = await fetch(`${urlApi}/user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formUser)
		});

        const messagesError: { [key: number]: string } = {
            400: "El servidor no pudo procesar la solicitud. Debido a que la sintaxis de la solicitud es incorrecta",
            404: "El servidor no puede encontrar el recurso solicitado",
            500: "Ocurrio un error en el servidor que impidió procesar la solicitud, intentarlo nuevamente, si el error persiste reportar con el Administrador",
        };

        onClose(response.status !== 200 ? messagesError[response.status] : "");
    }

    function validatePassword(password: string): boolean {
        const regex = /^(?=.*\d)(?=.*[$@$!%*?&*-/.])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

        return regex.test(password);
    }

</script>



<div class:visible={isOpen} class:invisible={!isOpen} class:ease-in-out={!isOpen} class:duration-500={!isOpen} class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
        From: "opacity-0"
        To: "opacity-100"
    Leaving: "ease-in-out duration-500"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class:opacity-100={isOpen} class:opacity-0={!isOpen} class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-500">
    </div>

    <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <!--
                    Slide-over panel, show/hide based on slide-over state.
        
                    Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                    From: "translate-x-full"
                    To: "translate-x-0"
                    Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                    From: "translate-x-0"
                    To: "translate-x-full"
                -->
                <div
                    class:translate-x-0={isOpen}
                    class:translate-x-full={!isOpen} 
                    class="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700"
                >
                    <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div class="px-4 sm:px-6">
                        <div class="flex items-start justify-between">
                            <h2 class="text-base font-semibold leading-6 text-gray-900 capitalize" id="slide-over-title">{title}</h2>
                            <div class="ml-3 flex h-7 items-center">
                                <button on:click={() => onClose("")}
                                    type="button" 
                                    class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                    <span class="absolute -inset-2.5"></span>
                                    <span class="sr-only">Close panel</span>
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="relative flex-1 px-4 sm:px-6">
                        <!-- Your content -->
                        <div>
                            <div class="mt-2 flex rounded-md shadow-sm">
                            <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">Id Usuario</span>
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                bind:value={formUser.usuario} 
                                class={!formUser.usuario && submit
                                    ? "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                    : "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                }
                                placeholder="Id de Usuario">
                            </div>
                        </div>
                        <div>
                            <div class="mt-2 flex rounded-md shadow-sm">
                            <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">Password</span>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                bind:value={formUser.password} 
                                class={(!formUser.password || !validatePassword(formUser.password) ) && submit
                                    ? "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                    : "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                }
                                placeholder="Contraseña de Usuario">
                            </div>
                        </div>                    
                        <div>
                            <div class="mt-2 flex rounded-md shadow-sm">
                            <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">Nombre(s)</span>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                bind:value={formUser.nombre} 
                                class={!formUser.nombre && submit
                                    ? "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                    : "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                }
                                placeholder="Nombre Usuario">
                            </div>
                        </div>
                        <div>
                            <div class="mt-2 flex rounded-md shadow-sm">
                                <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">Perfil</span>
                                <select 
                                    bind:value={formUser.idPerfil}
                                    name="customer_neighborhood"
                                    class={!formUser.idPerfil && submit
                                        ? "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                        : "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                    }>
                                    {#each profiles as p}
                                        <option value="{p}">{p}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            on:click={onSubmit} 
                            class="mt-2 block w-full rounded-md bg-emerald-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-600">
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

</div>