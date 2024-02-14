<script lang="ts">
    // Styles
    import "../app.css";
    // Types and Models
    import type { LayoutData } from "./$types";
    import type { Permission } from "$lib/index";
    // Components
    import SidebarDesktop from "$lib/components/SidebarDesktop.svelte";

    export let data: LayoutData;

    const permissions: Permission[] = [
        {name: "usuarios", path: "/user", icon: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"},
        {name: "medicamentos", path: "/medications", icon: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"}
    ];
</script>
 

{#if data.session}
    <div>
        <SidebarDesktop 
            permissions={permissions} 
        />

        <main class="py-4 lg:pl-72">
            <div class="container mx-auto sm:px-6 px-4">
                <!-- Your content -->
                <slot />
            </div>
        </main>
    </div>
{:else}
    <slot />
{/if}