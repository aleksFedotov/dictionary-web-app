<script lang="ts">
    import type { IMeaning } from "$lib/types";
    export let meaning: IMeaning 

</script>

<li class="mt-8 sm:mt-10 " data-testid="meaning">
    <div 
        class="
           flex items-center
        ">
        <span class="italic text-lg sm:text-2xl font-bold mr-5" aria-label="part of speech">
            {meaning.partOfSpeech}
        </span>

        <hr class="h-0.5 w-full mt-2 bg-white-300 dark:bg-black-100 border-0" />
    </div>

    <h4 class="text-white-400 mt-4 mb-4 sm:mb-6 text-base sm:text-lg">
        Meaning
    </h4>

    <ul class="flex flex-col gap-3 ml-4 sm:ml-10 list-disc marker:text-purple mb-4">
        {#each meaning.definitions as definition (definition.definition)}
                 <li class="text-[15px] sm:text-lg">
                   <span class="block" aria-label="definition">{definition.definition}</span> 
                   {#if definition.example}
                        <span class="text-grey mt-2 block" aria-label="example">"{definition.example}"</span>
                   {/if}
                </li>
        {/each}
    </ul>

    {#if meaning.synonyms.length }
    <div class="flex gap-6 " aria-label="synonyms">
        <h4 class="text-white-400 text-base sm:text-lg">Synonyms</h4>
        <ul class="flex flex-wrap">
            {#each meaning.synonyms as synonym, i (synonym + i) }
            <li aria-label="synonym">
                <a class="text-base sm:text-xl font-bold text-purple cursor-pointer  hover:underline hover:underline-offset-4 mr-2" href={synonym}>{synonym}</a>
            </li>
            {/each}
        </ul>
    </div>
    {/if}
    {#if meaning.antonyms.length }
    <div class="flex gap-6  mt-3" aria-label="antonyms">
        <h4 class="text-white-400 text-base sm:text-lg">Antonyms</h4>
        <ul class="flex flex-wrap">
            {#each meaning.antonyms as antonym,i (antonym + i) }
            <li aria-label="antonym">
                <a class="text-base sm:text-xl font-bold text-purple cursor-pointer  hover:underline hover:underline-offset-4 mr-2" href={antonym}>{antonym}</a>
            </li>
            {/each}
        </ul>
    </div>
  
{/if}

</li>

