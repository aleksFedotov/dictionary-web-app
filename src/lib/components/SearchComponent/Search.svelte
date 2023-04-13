<script lang="ts">
    import IconSearch from "../../UI/IconSearch.svelte";
    import {z} from "zod"
    import { page } from '$app/stores'
    import { goto } from "$app/navigation";
    import { onDestroy } from "svelte";
    import { loadingStore } from "$lib/stores/loadingStore";
    import LoadingSpinner from "$lib/UI/LoadingSpinner.svelte";


    // schema for form validation
    const schema =z.string().min(1, {message : "Whoops, can’t be empty…"}).trim()
    let error: string | null = null

    // listen for changes to the url parameter. When a change occurs, we update the query variable
    let query : string = ""
    const unsubscribe = page.subscribe((value) => {
        query = value.url.pathname.slice(1);
    });

    const submitHandler = () => { 
        // validate input with zode 
        const res =schema.safeParse(query.trim())
        if (!res.success) {
                // if validation is unsucceful we replace error with our custome error message
                error = res.error.issues[0].message
         } else if(query !== $page.url.pathname.slice(1)){
                // if validation is successful we navigate ot new page
                loadingStore.set(true)
                const homepage = $page.url.origin
               goto(homepage+`/${query}`)
        }            
    }



   onDestroy(() => {
        unsubscribe()
   })

 
</script>

<form 
    class="
        flex justify-between items-center
        w-full  mt-6 sm:mt-13 
        rounded-lg
        bg-white-200 dark:bg-black-200
        font-bold
        group
        border-[1px]
        border-transparent
        hover:border-purple 
        relative
        px-6 py-[14px] sm:p-6
        focus-within:border-purple 
        transition-colors
        duration-300
        "
        class:border={error}
        class:border-orange={error}
        
        on:submit|preventDefault= {submitHandler}
        >
        
    <input 
        class="
            text-base sm:text-xl
            bg-inherit
            outline-none
            w-full
            cursor-pointer
            text-inherit
        "
       placeholder="Search for any word…"
       aria-label='Search input'
       autocomplete="off"
       on:input={(e)=> {
        if(error) error = null
       
       }}
       bind:value={query}
        type="text" >


    {#if $loadingStore}
            <LoadingSpinner/>
    {:else}
        <button type='submit'>
            <IconSearch/>
        </button>
    {/if}

    {#if error}
        <div 
            class="
                text-orange
                font-normal
                absolute -bottom-[32px] -left-0
                w-[240px]    
        ">
            {error}
        </div>

    {/if}
</form>