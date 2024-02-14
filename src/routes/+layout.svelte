<script lang="ts">
    // Styles
    import "../app.css";
    // Models
    import type { Permission } from "$lib";
    // Components
    import SidebarDesktop from "$lib/components/SidebarDesktop.svelte";

    const permissions: Permission[] = [
        {name: "usuarios", path: "/user", icon: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"},
        {name: "medicamentos", path: "/medications", icon: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"}
    ];
    let openProfile: boolean = false;
</script>
 

<div>
    <SidebarDesktop 
        permissions={permissions} 
    />

    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <div class="flex-1 text-sm font-semibold leading-6 text-gray-900">Menu</div>
        <!-- <a href="#">
            <span class="sr-only">Your profile</span>
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                <span class="text-sm font-medium leading-none text-white uppercase">{data.session.first_name[0]}{data.session.last_name[0]}</span>
            </span>
        </a> -->
        <!-- Profile dropdown -->
        <div class="relative">
            <button type="button" class="-m-1.5 flex items-center p-1.5" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span class="sr-only">Your profile</span>
                <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                    <span class="text-sm font-medium leading-none text-white uppercase">echavira</span>
                </span>
            </button>

            <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <div
                class:visible={openProfile}
                class:invisible={!openProfile}
                class:ease-out={openProfile}
                class:duration-100={openProfile}
                class:ease-in={!openProfile}
                class:duration-75={!openProfile}
                class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none transition transform" 
                role="menu" 
                aria-orientation="vertical" 
                aria-labelledby="user-menu-button" 
                tabindex="-1">
                <!-- Active: "bg-gray-50", Not Active: "" -->
                <a href="/logout" class="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50" role="menuitem" tabindex="-1" id="user-menu-item-1">Salir</a>
            </div>
        </div>
    </div>

    <main class="py-4 lg:pl-72">
        <div class="container mx-auto sm:px-6 px-4">
            <!-- Your content -->
            <slot />
        </div>
    </main>
</div>