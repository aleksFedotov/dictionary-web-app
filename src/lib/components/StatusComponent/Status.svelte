<script lang="ts">
    import WelcomeEmoji from './WelcomeEmoji.svelte'
    import NotFoundEmoji from './NotFoundEmoji.svelte'
    import ErrorEmoji from './ErrorEmoji.svelte';

    export let status:string

    const headers: {[key:string] : string} = {
        "welcome" : 'Free Web Dictionary',
        "error" : "Sorry, Something Went Wrong",
        "notFound" : "No Definitions Found"
    }
    const message: {[key:string] : string} = {
        "welcome" : 'Hello there ! You can start using this free online dictionary by typing anything in the above searchbox.',
        "error" : "Sorry ! There is something wrong with our servers and we are working on it, please try again in a few minutes",
        "notFound" : "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."
    }



</script>

<div class="w-full py-12 px-6 flex flex-col items-center mt-5" >

    {#if status === "welcome"}
    <WelcomeEmoji/>
    {:else if status === "notFound"}
    <NotFoundEmoji/>
    {:else if status === "error"}
    <ErrorEmoji/>
    {/if}
 
    <h1 class="text-xl font-bold mb-6">{headers[status]}</h1>
    <p class="text-lg text-center text-white-400">{message[status]}</p>
   

</div>