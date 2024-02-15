<script lang="ts">
	  import type { User } from "$lib";
	  import AddUser from "$lib/components/AddUser.svelte";
	  import DetailUser from "$lib/components/DetailUser.svelte";
	  import Paginator from "$lib/components/Paginator.svelte";
    import type { PageData } from "./$types";


    export let data: PageData;

    let openSlideAddUser = false;
    let openSlideDetailUser = false;
    let selectedUser: User;

    $:params = data.params;

    const formatDate = (dateIso: Date): string => {
      const opciones: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const date = new Date(dateIso);
      return new Intl.DateTimeFormat('es-MX', opciones).format(date);
    };

    async function handleEventAddUser(event: CustomEvent<{isOpen: boolean, message: string}>) {
      if(event) {
        openSlideAddUser = event.detail.isOpen;
        if (event.detail.message.length) {
          alert(event.detail.message.length);
        } else {
            await getUsers();
        }
      }
    }

    async function handleEventDetailUser(event: CustomEvent<{isOpen: boolean, message: string}>) {
      if(event) {
        openSlideDetailUser = event.detail.isOpen;
        if (event.detail.message.length) {
          alert(event.detail.message.length);
        } else {
            await getUsers();
        }
      }
    }

    async function getUsers() {
      params.limit = 2;
      params.offset = 1;
      const dataParams = new URLSearchParams(params);
      const uri = `${data.urlApi}/user?${dataParams.toString()}`;

      const response = await fetch(uri, {
        method: 'GET',
        headers: {            
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 200) {
        const messagesError: { [key: number]: string } = {
            204: "No se encontraron datos",
            400: "El servidor no pudo procesar la solicitud. Debido a que la sintaxis de la solicitud es incorrecta",
            404: "El servidor no puede encontrar el recurso solicitado",
            500: "Ocurrio un error en el servidor que impidió procesar la solicitud, intentarlo nuevamente, si el error persiste reportar con el Administrador",
        };
        alert(messagesError[response.status]);
      }

      const users = (await response.json()) as User[];
      const totalPages = Math.ceil(users[0].records / (params.limit));

      data.records = users[0].records;
      data.users = users;   
      data.pages = totalPages; 
    }

    async function getUserById(id: number) {
      const response = await fetch(`${data.urlApi}/user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 200) {
        const messagesError: { [key: number]: string } = {
            204: "No se encontraron datos",
            400: "El servidor no pudo procesar la solicitud. Debido a que la sintaxis de la solicitud es incorrecta",
            404: "El servidor no puede encontrar el recurso solicitado",
            500: "Ocurrio un error en el servidor que impidió procesar la solicitud, intentarlo nuevamente, si el error persiste reportar con el Administrador",
        };
        alert(messagesError[response.status]);
        return;
      }

      selectedUser = (await response.json()) as User;
      openSlideDetailUser = !openSlideDetailUser;
    }

    async function deleteUserById(id: number) {
      const response = await fetch(`${data.urlApi}/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 200) {
        const messagesError: { [key: number]: string } = {
            204: "No se encontraron datos",
            400: "El servidor no pudo procesar la solicitud. Debido a que la sintaxis de la solicitud es incorrecta",
            404: "El servidor no puede encontrar el recurso solicitado",
            500: "Ocurrio un error en el servidor que impidió procesar la solicitud, intentarlo nuevamente, si el error persiste reportar con el Administrador",
        };
        alert(messagesError[response.status]);
        return;
      }

      await getUsers();      
    }

</script>


<div class="md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1">
      <h1 class="text-lg font-semibold leading-6 text-gray-900 sm:truncate">Administracion de Usuarios</h1>
    </div>
    <div class="mt-4 flex md:ml-4 md:mt-0">
      <button type="button" on:click={() => openSlideAddUser = !openSlideAddUser} class="inline-flex items-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600">Nuevo</button>
    </div>
</div>  

{#if data.users}
    <div class="-mx-4 mt-8 sm:-mx-0">
        <table class="min-w-full divide-y divide-gray-300">
            <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Usuario</th>
                  <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Nombre</th>
                  <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Fech. Creación</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Perfil</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span class="sr-only">Detail</span>
                  </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                {#each data.users as usr}
                    <tr>
                        <td class="w-full max-w-0 py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                            {usr.usuario}
                            <dl class="font-normal lg:hidden">
                            <dt class="sr-only">Nombre</dt>
                            <dd class="mt-1 truncate text-gray-700">{usr.nombre}</dd>
                            <dt class="sr-only sm:hidden">Telefono</dt>
                            <dd class="mt-1 truncate text-gray-500 sm:hidden">{usr.usuario}</dd>
                            </dl>
                        </td>
                        <td class="hidden px-3 py-2 text-sm text-gray-500 lg:table-cell">{usr.nombre}</td>
                        <td class="hidden px-3 py-2 text-sm text-gray-500 sm:table-cell">{formatDate(usr.fechaCreacion)}</td>
                        <td class="px-3 py-2 text-sm text-gray-500">{usr.idPerfil}</td>
                        <td class="py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <!-- <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, Lindsay Walton</span></a> -->
                            <button type="button" on:click={() => deleteUserById(usr.idUsuario)} class="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-700">Eliminar</button>
                            <button type="button" on:click={() => getUserById(usr.idUsuario)} class="rounded bg-gray-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-700">Detalle</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <Paginator
          totalRecords={data.records}
          path={data.path}
          currentPage={params?.offset}
          {params}
          totalPages={data.pages}
        />
    </div>
{:else}
    <div>{data.messageError}</div>
{/if} 



<AddUser 
    isOpen={openSlideAddUser}
    title={"Registrar Usuario"}
    urlApi={data.urlApi}
    on:eventSlideAddUser={handleEventAddUser}
/>

<DetailUser
  isOpen={openSlideDetailUser}
  title={"Datos Usuario"}
  urlApi={data.urlApi}
  user={selectedUser}
  on:eventSlideDetailUser={handleEventDetailUser}
/>