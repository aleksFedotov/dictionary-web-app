<script>
    import IconLogo from "../../UI/IconLogo.svelte";
    import Select from "./SelectComponent/Select.svelte";
    import ToggleTheme from "./ToggleThemeComponent/ToggleTheme.svelte";
</script>



<header class="
        flex justify-between items-center   
        mt-6 sm:mt-14 
        ">
    <a href="/" aria-label="Logo return to main page">
        <IconLogo/>
    </a>
    
    <div class="flex">
        <Select/>
        <ToggleTheme/>
    </div>
</header>