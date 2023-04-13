<script lang="ts">
    import "../app.css";
    
    import Header from "../lib/components/HeaderComponent/Header.svelte";
    import Search from "../lib/components/SearchComponent/Search.svelte";
    import type { PageData } from './$types';
    import {fontStore} from "../lib/stores/fontStore";

    import { themeStore } from "$lib/stores/themeStore";
    
    export let data: PageData

    const {themeCookie, fontCookie} = data

    if(themeCookie) {
        themeStore.set(themeCookie)
    }

    if(fontCookie) {
        fontStore.set(fontCookie)
    }
    
</script>


<div class="max-w-[737px] mx-auto w-full px-6 pb-6 h-full"
    class:font-serif={$fontStore=== "Serif"} 
    class:font-sans={$fontStore==="San Serif"} 
    class:font-mono={$fontStore==='Mono'}
>
    <Header/>
    <Search/>
    <slot/>
</div>