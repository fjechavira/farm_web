<script lang="ts">
  // Models and Types
  import type { Medication } from "$lib/index";
  import type { PageData } from "./$types";
  // Components
	import AddMedication from "$lib/components/AddMedication.svelte";
  import Paginator from "$lib/components/Paginator.svelte";  
	import DetailMedication from "$lib/components/DetailMedication.svelte";
	import MessageContent from "$lib/components/MessageContent.svelte";


  export let data: PageData;

  let openSlideAddMedication = false;
  let openSlideDetaiMedication = false;
  let selectedMedication: Medication;

  $:params = data.params;

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
  }

  async function handleEventAddMedication(event: CustomEvent<{isOpen: boolean, message: string}>) {
    if(event) {
      openSlideAddMedication = event.detail.isOpen;
      if (event.detail.message.length) {
        alert(event.detail.message.length);
      } else {
          await getMedications();
      }
    }
  }

  async function handleEventDetailMedication(event: CustomEvent<{isOpen: boolean, message: string}>) {
    if(event) {
      openSlideDetaiMedication = event.detail.isOpen;
      if (event.detail.message.length) {
        alert(event.detail.message.length);
      } else {
          await getMedications();
      }
    }
  }

  async function getMedications() {
    params.limit = 5;
    params.offset = 1;
    const dataParams = new URLSearchParams(params);
    const uri = `${data.urlApi}/medication?${dataParams.toString()}`;

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
      return;
    }

    const medications = (await response.json()) as Medication[];
    const totalPages = Math.ceil(medications[0].records / (params.limit));

    data.records = medications[0].records;
    data.medications = medications;   
    data.pages = totalPages;
  }

  async function getMedicationById(id: number) {
    const response = await fetch(`${data.urlApi}/medication/${id}`, {
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

    selectedMedication = (await response.json()) as Medication;
    openSlideDetaiMedication = !openSlideDetaiMedication;
  }

  async function deleteMedicationById(id: number) {
    const response = await fetch(`${data.urlApi}/medication/${id}`, {
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

    await getMedications();      
  }

</script>


<div class="md:flex md:items-center md:justify-between">
  <div class="min-w-0 flex-1">
    <h1 class="text-lg font-semibold leading-6 text-gray-900 sm:truncate">Administracion de Medicamentos</h1>
  </div>
  <div class="mt-4 flex md:ml-4 md:mt-0">
    <button type="button" on:click={() => openSlideAddMedication = !openSlideAddMedication} class="inline-flex items-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600">Nuevo</button>
  </div>
</div>  

{#if data.medications}
  <div class="-mx-4 mt-8 sm:-mx-0">
      <table class="min-w-full divide-y divide-gray-300">
          <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Medicamento</th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Forma</th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Presentacion</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Stock</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="sr-only">Detail</span>
                </th>
              </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
              {#each data.medications as med}
                  <tr>
                      <td class="w-full max-w-0 py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                          {med.nombre}
                          <dl class="font-normal lg:hidden">
                            <dt class="sr-only">Medicamento</dt>
                            <dd class="mt-1 truncate text-gray-700">{med.nombre}</dd>
                            <dt class="sr-only sm:hidden">Forma</dt>
                            <dd class="mt-1 truncate text-gray-500 sm:hidden">{med.nombreForma}</dd>
                          </dl>
                      </td>
                      <td class="hidden px-3 py-2 text-sm text-gray-500 lg:table-cell">{med.nombreForma}</td>
                      <td class="hidden px-3 py-2 text-sm text-gray-500 sm:table-cell">{med.presentacion}</td>
                      <td class="px-3 py-2 text-sm text-gray-500">{formatAmount(med.precio)}</td>
                      <td class="px-3 py-2 text-sm text-gray-500">{med.stock}</td>
                      <td class="py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button type="button" on:click={() => deleteMedicationById(med.idMedicamento)} class="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-700">Eliminar</button>
                          <button type="button" on:click={() => getMedicationById(med.idMedicamento)} class="rounded bg-gray-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-700">Detalle</button>
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
  <MessageContent 
    title={"Listado de Medicamentos"}
    message={data.messageError}
    typeMessage={data.messageError.length ? "error" : "info" }
  />
{/if} 



<AddMedication 
  isOpen={openSlideAddMedication}
  title={"Registrar Medicamento"}
  urlApi={data.urlApi}
  pharmaceuticalForm={data.pharmaceuticalForm}
  on:eventSlideAddMedication={handleEventAddMedication}
/>

<DetailMedication
  isOpen={openSlideDetaiMedication}
  title={"Datos Usuario"}
  urlApi={data.urlApi}
  medication={selectedMedication}
  pharmaceuticalForm={data.pharmaceuticalForm}
  on:eventSlideDetailMedication={handleEventDetailMedication}
/>