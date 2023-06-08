<script>
    let todoItems = []
    let newItem = ""

    function addItem() {
        todoItems = [...todoItems, newItem]
        newItem = ""
    }

    function removeItem(index) {
        todoItems.splice(index, 1)
        todoItems = todoItems;
    }    

</script>

<main>
    <h1>TODO</h1>
    <div>
        <label for="item">Input next item:</label>
        <input bind:value={newItem} type="text" id="item">
        <button on:click={addItem}>Add</button>
    </div>
    <div id=list>
        {#each todoItems as item, index}
            <p>{item}</p><button on:click={() => removeItem(index)}>Remove</button>
        {/each}
    </div>
</main>

<style>

    h1 {
        text-align: center;
        font-size: 70px;
    }

    div {
        text-align: center;
    }

    #list {
        
    }

</style>