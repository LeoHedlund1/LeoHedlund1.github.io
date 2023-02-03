<script>
    import Layout from "../+layout.svelte";


    let count = 0;
    function addButton(){
        count++;
        console.log(count)
    }

</script>

<main>
    <header>Button-Clicker</header>
    <div>
        <h1>Buttons: {count}</h1>
        <button on:click={addButton}>Button</button>
    </div>
</main>

<style>

    main{
        height: 100vh;
        width: 100%;
    }

    header{
        font-size: 50px;
        text-align: center;
    }

    button{
        width: 300px;
        height: 300px;
    }

    div{
        margin-top: 50px;
        text-align: center;
    }

</style>