<script lang="ts">
    import IconMoon from "../../../UI/IconMoon.svelte";
    import {themeStore} from "../../../stores/themeStore";
    $: isDarkMode = $themeStore === "dark"
   
</script>


<button
    class="
        flex items-center 
        pl-4 sm:pl-6
        group
        cursor-pointer
        text-white-100
        gap-4
    "
    on:click={themeStore.toggleTheme}
    aria-label="dark mode toggle"
>
    <div
        class="
            w-10 h-5
            bg-white-400 group-hover:bg-purple
            dark:bg-purple
            rounded-full
            before:block before:h-[14px] before:aspect-square before:mt-[3px] before:ml-[3px]  
            before:rounded-full before:bg-white-100  before:absolute before:z-10 before:transition-all
            forwards
            "
        class:before:translate-x-[20px] = {isDarkMode} 
        class:before:translate-x-[0px] = {!isDarkMode} 
        aria-label={`${isDarkMode ? "dark" : "light"} mode`}
    />
    <div>
        <IconMoon/>
    </div>
</button>

<style>
     .forwards::before {
    animation-fill-mode: forwards
}
</style>