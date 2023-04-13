<script lang="ts">
    import lottie from 'lottie-web'
    import {onMount,afterUpdate} from "svelte"  
    import errorEmoji from "../../emojies/emoji-sad.json"
   
    let animationContainer : HTMLElement
  
	onMount(() => {
		const animation = lottie.loadAnimation({
			container: animationContainer,
            animationData : errorEmoji,
			
		})
		return () => {
			animation.destroy()
		}
	})

</script>


<div bind:this={animationContainer} class="h-[150px] w-[150px] mb-6" aria-label="sad emoji"/>