<script>
  
  let cards = [];
  let cardid = 0;

  for (let index = 0; index < 25; index++) {

    let imgid = Math.floor(Math.random() * 1084);

    for (let i = 0; i < 2; i++) {
      cards.push({
        id: cardid, 
        img: "https://picsum.photos/id/100/100" + imgid, // TODO: unique images per card card
        flipped: true,  // TODO: think
        completed: false,
      });
      cardid++;
    }
  }
  let flipcount = 0;
  function flip(card) {
    // flip card over if two cards are not already flipped
    // TODO: and card is already not flipped
    if (card.flipped && flipcount < 2) {
      // TODO: Probably do what?
      card.flipped = false;
      flipcount++;
      // flip the cards over after 2s from seeing both cards
      if (flipcount > 1) {
        setTimeout(() => {
          // flip over cards that have not been marked as "completed"
          let flippedCards = [];

          cards.forEach((card) => {
            if (card.flipped && !card.completed) {
              flippedCards = [];
            }
          });
          if (flippedCards[0].cardid == flippedCards[1].cardid) {
            flippedCards[0].completed = true;
            flippedCards[1].completed = true;
          }

          cards.forEach((card) => {
            card.flipped = !card.completed;
          });

          flipcount = 0;
          cards = cards;
        }, 2000);
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
