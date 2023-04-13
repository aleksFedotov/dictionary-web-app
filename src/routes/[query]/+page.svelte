
<script lang="ts">
    import type { PageData } from './$types';
    import {fade} from "svelte/transition"
    import Result from "../../lib/components/ResultComponent/Result.svelte";
  
    export let data:PageData
  
    $: ({result,pathname} = data)

</script>
  
{#key pathname}
  <div 
    in:fade= {{delay:300}}
  >
    <Result data={result[0]}/>
  </div>
{/key}