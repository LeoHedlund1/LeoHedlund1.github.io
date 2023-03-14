<script>

  let matchedCards = 0;
  let cards = [];
  let cardid = 0;
  let imgList = [];
  let progressboxes = [];

  for (let index = 0; index < 20; index++) {

    progressboxes.push({visible: false});

    let imgid = Math.floor(Math.random() * 1084);

    if(!imgList.includes(imgid))
    {
      imgList.push(imgid);
      for (let i = 0; i < 2; i++) {
        cards.push({
          id: cardid,
          //either fix images not appearing or add own images
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

  function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

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

    if (card.flipped && flipcount < 2) {

      card.flipped = false;
      flipcount++;

      if (flipcount == 2) {
        setTimeout(() => {

          if (cardList[0].id == cardList[1].id){
            cardList[0].completed = true;
            cardList[1].completed = true;
            progressboxes[matchedCards].visible = true;
            matchedCards++;
          }

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
      //play sound instead
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
        class:completed={card.completed}
      >
        <img class="front" src=front.webp alt="" />
        <img class="back" src={card.img} alt="" />
      </div>
    {/each}
  </div>
  <p>Remaining: {20 - matchedCards}</p>
  <div id="progressbar">
    {#each progressboxes as box}
      <div class="box" class:visible={box.visible}></div>
    {/each}
  </div>
  
</main>

<style>
  main {
    margin-top: 50px;
    display: block;
    place-content: center;
    place-items: center;
  }

  .row {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(10, 100px);
    grid-template-rows: repeat(4, 100px);
    justify-content: center;
  }

  .card {
    border: 5px solid red;
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

  .card.completed {
    border: 5px solid lime;
  }

  p {
    text-align: center;
    font-size: 40px;
    white-space: nowrap;
  }

  #progressbar {
    display: grid;
    grid-template-columns: repeat(20, 5%);
    grid-template-rows: repeat(1, 55px);
    border: 1px solid black;
  }

  .box {
    width: 100%;
    height: 100%;
    background-color: lime;
    opacity: 0%;
  }

  .box.visible {
    opacity: 100%;
  }

</style>