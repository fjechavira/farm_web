import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { FARM_API } from "$env/static/private";
import type { Params, Medication, PharmaceuticalForm } from "$lib/index";


export const load = (async ({ locals, fetch, url: { pathname, searchParams } }) => {
    if (!locals.session) {
        throw redirect(307, '/login');
    }

    const limit = searchParams.get('limit') || '5';
    const offset = searchParams.get('offset') || '1';

    const params: Params = {
        limit: +(limit),
        offset: +(offset),
    };
    let pharmaceuticalForm: PharmaceuticalForm[] = [];

    const dataParams = new URLSearchParams(params);
    const uri = `${FARM_API}/medication?${dataParams.toString()}`;

    const response = await fetch(uri, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const messagesError: { [key: number]: string } = {
        204: "No se encontraron datos",
        400: "El servidor no pudo procesar la solicitud. Debido a que la sintaxis de la solicitud es incorrecta",
        404: "El servidor no puede encontrar el recurso solicitado",
        500: "Ocurrio un error en el servidor que impidió procesar la solicitud, intentarlo nuevamente, si el error persiste reportar con el Administrador",
    };

    if (response.status !== 200) {
        return {
            medications: null,
            pharmaceuticalForm,
            records: null,
            messageError: messagesError[response.status],
            params: params,
            pages: null,
            urlApi: FARM_API,
            path: pathname
        };
    }

    const medications = (await response.json()) as Medication[];
    const totalPages = Math.ceil(medications[0].records / (params.limit));

    const responsePharmaceuticForm = await fetch(`${FARM_API}/medication/presentation`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (responsePharmaceuticForm.status === 200) {
        pharmaceuticalForm = (await responsePharmaceuticForm.json()) as  PharmaceuticalForm[];
    }
       
    return {
        medications: medications,
        pharmaceuticalForm,
        records: medications[0].records,
        messageError: null, 
        params: params,
        pages: totalPages,
        urlApi: FARM_API,
        path: pathname
    };

}) satisfies PageServerLoad;