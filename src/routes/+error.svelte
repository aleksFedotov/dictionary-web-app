<script lang="ts">
    import Status from "../lib/components/StatusComponent/Status.svelte";    
    import {page} from "$app/stores"
    import { loadingStore } from "$lib/stores/loadingStore";
    import { onDestroy } from "svelte";


     const unsubscribe = page.subscribe(() => loadingStore.set(false))
    

    onDestroy(() => {
        unsubscribe()
    })
</script>

<main>
    {#if $page.status === 404}
    <Status status='notFound'/>
    {:else}
    <Status status='error'/>
    {/if}
</main >