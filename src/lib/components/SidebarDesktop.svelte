<script lang="ts">
	import { page } from "$app/stores";
	import type { Permission } from "$lib/index";

    export let permissions: Permission[] = [];
</script>

<!-- Static sidebar for desktop -->
<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <nav class="flex flex-1 flex-col mt-4">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
                {#each permissions as p}
                    {@const active = $page.url.pathname === p.path}
                    <li>                        
                        <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
                        <a 
                            href="{p.path}"
                            class:bg-gray-100={active}
                            class:text-gray-900={active}
                            class="hover:bg-gray-50 hover:text-gray-900 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-600 capitalize">
                                <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
                                <svg
                                    class:text-gray-500={active}
                                    class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke-width="1.5" 
                                    stroke="currentColor" 
                                    aria-hidden="true">
                                    <path 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round" 
                                        d="{p.icon}" 
                                    />
                                </svg>
                            {p.name}
                        </a>
                    </li>
                {/each}  
            </ul>
          </li>
          <li class="-mx-6 mt-auto">
                <a href="/logout" class="group flex items-center border-l-4 border-transparent px-3 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                    <svg class="mr-4 h-6 w-6 text-gray-600 group-hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    cerrar sesión
                </a>
          </li>
        </ul>
      </nav>
    </div>
</div>