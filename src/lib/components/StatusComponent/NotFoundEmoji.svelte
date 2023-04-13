<script lang="ts">
    import lottie from 'lottie-web'
    import {onMount,afterUpdate} from "svelte"  
    import noEmoji from "../../emojies/emoji-no.json"
   
    let animationContainer : HTMLElement
  
	onMount(() => {
		const animation = lottie.loadAnimation({
			container: animationContainer,
            animationData : noEmoji,
			
		})
		return () => {
			animation.destroy()
		}
	})

</script>


<div bind:this={animationContainer} class="h-[150px] w-[150px] mb-6" aria-label="no emoji"/>