<script lang="ts">
  
    import Meaning from "./MeaningComponent/Meaning.svelte";
    import type {IData} from "../../types"
    import IconNewWindow from "../../UI/IconNewWindow.svelte";
    import { onMount } from 'svelte';
    import { loadingStore } from "$lib/stores/loadingStore";
 

    export let data: IData

    $: audioSource = data.phonetics.find(item => item.audio.length > 1)?.audio

   const playAudio = () => {
    
    if(audioSource) {
        const audio = new Audio(audioSource)
        audio.play()
    }

   }

   onMount(() => loadingStore.set(false) )
   
</script>


<section class="w-full mt-6 sm:mt-11" >
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-[32px] sm:text-6.5xl font-bold sm:leading-[77px] mb-2" aria-label='word'>
                {data.word}
            </h1>
            {#if data.phonetic}  
                <h2 class="text-2xl text-purple" aria-label='phonetic'>
                    {data.phonetic}
                </h2>
            {/if}
        </div>


        {#if audioSource}
            <button 
                class="
                    h-12 w-12 sm:h-[75px] sm:w-[75px] 
                    rounded-full  
                    flex items-center justify-center 
                    group
                    bg-purple-normal hover:bg-purple 
                    transition-all duration-300
                    "
                    on:click={playAudio}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g class="group-hover:fill-white-100 transition-all duration-300" fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g></svg>
            </button>
        {/if}
    </div>
    
    <ul>
        {#each data.meanings as meaning,i (meaning.partOfSpeech + i)}
            <Meaning meaning={meaning}/>
        {/each}
    </ul>

    <hr class="h-0.5 bg-white-300 dark:bg-black-100 opacity-100 border-0 mt-8 sm:mt-10 mb-5">

    {#if data.sourceUrls.length}
        <div class="flex flex-col sm:flex-row" aria-label="source url">

            <h4 class="text-white-400 mb-1 sm:mr-6 underline underline-offset-2">Source</h4>       
            <a href={data.sourceUrls[0]} class="flex items-center underline underline-offset-2" target="_blank">
        
                <span  class="mr-2 text-sm text-black-200 dark:text-white-100 hover:underline">{data.sourceUrls[0] }</span>   
                <IconNewWindow/> 
        
            </a>
        </div>
    {/if}
 
        
</section>