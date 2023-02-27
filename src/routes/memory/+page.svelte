<script>
  
  function getID(list) {
    let newID = Math.floor(Math.random() * 1084) 
    for (let i = 0; i < list; i++) {
      if (newID == list[i]){
        newID = getID(list);
        console.log("a")
      }
    }
    return newID;
  }

  let cards = [];
  let cardid = 0;
  let imgList = [];

  for (let index = 0; index < 25; index++) {

    let imgid = Math.floor(Math.random() * 25);
    if(!imgList.includes(imgid))
    {
      imgList.push(imgid);
      for (let i = 0; i < 2; i++) {
        cards.push({
          id: cardid, 
          img: "https://picsum.photos/id/" + imgid + "/400/400",
          flipped: true,
          completed: false,
        });
      }
      cardid++;
    } else {
      index--;
    }
  }

  // shuffle cards
  function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

cards = shuffle(cards)

  let flipcount = 0;
  let cardList = [];

  function flip(card) {
    cardList.push(card)
    // flip card over if two cards are not already flipped
    // TODO: and card is already not flipped
    if (card.flipped && flipcount < 2) {
      // TODO: Probably do what?
      card.flipped = false;
      flipcount++;
      // flip the cards over after 2s from seeing both cards
      if (flipcount == 2) {
        setTimeout(() => {
          // mark matching cards as completed
          if (cardList[0].id == cardList[1].id){
            cardList[0].completed = true;
            cardList[1].completed = true;
          }

          // flip over cards that have not been marked as "completed"
          let allComplete = true;
          cards.forEach((c) => {
            if (!c.completed) {
              allComplete = false;
            }
            c.flipped = !c.completed;
          })

          flipcount = 0;
          cardList = [];
          cards = cards;

          if (allComplete) {
            alert("complete")
          }

        }, 1000);
      }
      cards = cards;
    } else {
      alert("chill");
    }
  }
</script>

<main>
  <div class="row">
    {#each cards as card, i}
      <div
        on:click={() => {
          flip(card);
        }}
        on:keypress={() => {
          flip(card);
        }}
        class:flipped={card.flipped}
        class="card"
      >
        <img class="front" src=front.webp alt="" />
        <img class="back" src={card.img} alt="" />
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    margin-top: 50px;
    display: flex;
    place-content: center;
    place-items: center;
  }

  .row {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(10, 100px);
    grid-template-rows: repeat(5, 100px);
  }

  .card {
    border: 1px solid black;
    cursor: pointer;
    transition: transform 1s;
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
  }

  .card.flipped {
    transform: rotateY(180deg);
  }

  .card .back {
    transform: rotateY(0deg);
  }

  .card .front {
    transform: rotateY(180deg);
  }

  .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    position: absolute;
  }
</style>
