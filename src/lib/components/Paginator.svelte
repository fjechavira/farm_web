<script lang="ts">
	import type { Params  } from '$lib/index';
	import { createEventDispatcher } from 'svelte';

	export let totalRecords: number = 0;
	export let path = '';
	export let currentPage: number = 1;
	export let params: Params = {
		limit: 5,
		offset: 1,
	};
	export let totalPages: number = 0;

	const dispatch = createEventDispatcher();

	function decrement(): void {
		if (currentPage <= 1) {
			params.offset = 1;
			let stringPath = '';
			if (params) {
				Object.keys(params).forEach((key, index) => {
					stringPath =
						index === 0
							? stringPath.concat(`?${key}=${params[key]}`)
							: stringPath.concat(`&${key}=${params[key]}`);
				});
			}
			path = stringPath;
			return;
		}
		currentPage--;
		params.offset = currentPage;
		let stringPath = '';
		if (params) {
			Object.keys(params).forEach((key, index) => {
				stringPath =
					index === 0
						? stringPath.concat(`?${key}=${params[key]}`)
						: stringPath.concat(`&${key}=${params[key]}`);
			});
		}
		path = stringPath;
		const detail = {path};
		dispatch("onPagination", detail);
	}

	function increment(): void {
		if (currentPage >= totalPages) {
			params.offset = currentPage;
			let stringPath = '';
			if (params) {
				Object.keys(params).forEach((key, index) => {
					stringPath =
						index === 0
							? stringPath.concat(`?${key}=${params[key]}`)
							: stringPath.concat(`&${key}=${params[key]}`);
				});
			}
			path = stringPath;
			return;
		}
		currentPage++;
		params.offset = currentPage;
		let stringPath = '';
		if (params) {
			Object.keys(params).forEach((key, index) => {
				stringPath =
					index === 0
						? stringPath.concat(`?${key}=${params[key]}`)
						: stringPath.concat(`&${key}=${params[key]}`);
			});
		}
		path = stringPath;
		const detail = {path};
		dispatch("onPagination", detail);
	}
</script>

<!-- Paginator -->
<nav class="flex items-center justify-between bg-white mt-2" aria-label="Pagination">
	<div class="hidden sm:block">
		<p class="text-sm text-gray-700">
			Mostrando
			<span class="font-medium">{1 + (params.limit || 10) * (currentPage - 1)}</span>
			al
			<span class="font-medium">{(params.limit || 10) * currentPage}</span>
			de
			<span class="font-medium">{totalRecords}</span>
			resultados
		</p>
	</div>
	<div class="flex flex-1 justify-between sm:justify-end">
		<a
			href={path}
			on:click={decrement}
			class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
			>Anterior</a
		>
		<a
			href={path}
			on:click={increment}
			class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
			>Siguiente</a
		>
	</div>
</nav>
<!-- End Paginator -->