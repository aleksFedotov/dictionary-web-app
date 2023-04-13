
<script lang="ts">
  import { clickOutside } from "$lib/actions/clickOutside";
  


  import IconArrowDown from "../../../UI/IconArrowDown.svelte";
  import {fontStore} from "../../../stores/fontStore";
  import {slide, fade} from "svelte/transition"
  
  const fonts = ['San Serif', 'Serif', "Mono"]
  
  let isOpened = false

  $: console.log(isOpened)

    $: selectedInd = fonts.indexOf($fontStore)

    const toggle = () => {
      isOpened = !isOpened
    }


    const close = () => {
      isOpened = false
    }

  
    const selectHandler = (font:string) => {
        fontStore.setFont(font)
        close()
    }

    const keyDownHandler = (event:KeyboardEvent) => {
      if(event.key === "ArrowDown") {
        if(selectedInd < fonts.length-1) selectedInd++
        else selectedInd = 0
      }
      if(event.key === "ArrowUp") {
        if(selectedInd >0 ) selectedInd--
        else selectedInd = fonts.length-1
      }
      if(event.key === "Escape") {
        close()
      }
      if(event.key === "Enter") {
        event.preventDefault()
        if(!isOpened) isOpened = true
        else selectHandler(fonts[selectedInd])
        
      }
    }

  </script>

  
  <div class="

    relative 
    pr-6 border-r border-grey
    "

    use:clickOutside 
    
    on:clickoutside = {()=> isOpened = false}
    >
    <button class=" flex items-center w-full cursor-pointer" 
      class:font-serif={$fontStore=== "Serif"} 
      class:font-sans={$fontStore==="San Serif"} 
      class:font-mono={$fontStore==='Mono'}

      on:click={toggle}
      on:keydown={keyDownHandler}
      aria-label="Font select"
    >
      <span class="font-bold mr-[18px]" aria-label="Selected font">{$fontStore}</span>
      <div  class='transition' class:rotate-180={isOpened} class:rotate-0={!isOpened}>
        <IconArrowDown/>
      </div>
    </button>
  
    {#if isOpened}
        <div class="
          bg-white-100 text-black-200
          dark:bg-black-300 dark:text-white-100
          p-6  pr-4 sm:pr-6
          shadow-select-light
          dark:shadow-select-dark
          absolute right-6 top-10
          rounded-2xl
          font-bold
          z-10
          "
          transition:slide
          data-testid='dropdown'
       
        >
            <ul class="w-[90px] flex flex-col gap-4" in:fade={{delay:200}} out:fade={{duration: 100}} >
         
              <li 
                class="font-sans cursor-pointer hover:text-purple"
                class:text-purple ={selectedInd === 0}
                on:click={()=>selectHandler("San Serif")}
                on:keypress={()=> selectHandler("San Serif")}
                aria-label="San serif font"
              >
                San Serif
              </li>
              <li 
                class="font-serif cursor-pointer hover:text-purple"
                class:text-purple ={selectedInd === 1}
                on:click={()=>selectHandler("Serif")}
                on:keypress={()=> selectHandler("Serif")}
                aria-label="Serif font"
              >
                Serif
              </li>
              <li 
                class="font-mono cursor-pointer hover:text-purple"
                class:text-purple ={selectedInd === 2}
                on:click={()=>selectHandler("Mono")}
                on:keypress={()=> selectHandler("Mono")}
                aria-label="Mono font"
              >
                Mono
              </li>
            </ul>
        </div>
    {/if}
  
  </div>