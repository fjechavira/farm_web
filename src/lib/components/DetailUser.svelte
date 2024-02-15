<script lang="ts">
	import { createEventDispatcher } from "svelte";
    // Models and Types
    import type { User } from "$lib/index";

    export let isOpen: boolean = false;
    export let title: string = "";
    export let urlApi: string = "";
    export let user: User;


    let submit:boolean = false;
    const dispatch = createEventDispatcher();
    const profiles: number[] = [1,2,3];
    $:active = true;

    function onClose(message: string) {
        isOpen = !isOpen;
        submit = false;

        const detail = {isOpen, message};
        dispatch("eventSlideDetailUser", detail);
    }

    function onSubmit() {
        submit = true;

        return;
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
                                    <button
                                        on:click={() => onClose("")}
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
                            {#if user}
                                <div>
                                    <div class="mt-2 flex rounded-md shadow-sm">
                                    <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">Id Usuario</span>
                                    <input 
                                        type="text" 
                                        name="username" 
                                        id="username" 
                                        bind:value={user.usuario} 
                                        disabled={true}
                                        class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200">
                                    </div>
                                </div>
                                <div>
                                    <div class="mt-2 flex rounded-md shadow-sm">
                                    <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">Password</span>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        bind:value={user.password} 
                                        class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                        placeholder="Contraseña de Usuario">
                                    </div>
                                </div>                    
                                <div>
                                    <div class="mt-2 flex rounded-md shadow-sm">
                                    <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">Nombre(s)</span>
                                    <input 
                                        type="text" 
                                        name="first_name" 
                                        id="first_name" 
                                        bind:value={user.nombre} 
                                        class={!user.nombre && submit
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
                                            bind:value={user.idPerfil}
                                            name="user_profile"
                                            class={!user.idPerfil && submit
                                                ? "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                                : "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                            }>
                                            {#each profiles as p}
                                                <option value="{p}">{p}</option>
                                            {/each}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div class="mt-2">
                                        <div class="flex items-center justify-between">
                                            <span class="flex flex-grow flex-col">
                                            <span class="text-sm font-medium leading-6 text-gray-900">Habilitado</span>
                                            </span>
                                            <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                                            <button on:click={() => active = !active} type="button" class:bg-emerald-500={active} class:bg-gray-200={!active} class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" role="switch" aria-checked="false">
                                                <span class="sr-only">Use setting</span>
                                                <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                                <span class:translate-x-5={active} class:translate-x-0={!active} class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                                                <!-- Enabled: "opacity-0 duration-100 ease-out", Not Enabled: "opacity-100 duration-200 ease-in" -->
                                                <span class:opacity-0={active} class:duration-100={active} class:ease-out={active} class:opacity-100={!active} class:duration-200={!active} class:ease-in={!active} class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
                                                    <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                                    <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                                <!-- Enabled: "opacity-100 duration-200 ease-in", Not Enabled: "opacity-0 duration-100 ease-out" -->
                                                <span class:opacity-100={active} class:duration-200={active} class:ease-in={active} class:opacity-0={!active} class:duration-100={!active} class:ease-out={!active} class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
                                                    <svg class="h-3 w-3 text-emerald-500" fill="currentColor" viewBox="0 0 12 12">
                                                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                                    </svg>
                                                </span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    on:click={onSubmit} 
                                    class="mt-2 block w-full rounded-md bg-emerald-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-600">
                                    Guardar
                                </button>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>