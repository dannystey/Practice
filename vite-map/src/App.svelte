<script>
  import cities from './data/cities-test.json';
</script>

<main>
  <div class="map-container">
    {#each cities as city}
      <i class="dot" data-name="{city.name} {city.country_name}" 
      style:left="{(Number(city.longitude) + 180)/3.6}%"
      style:bottom="{(Number(city.latitude) + 90)/1.8}%"
      >
    </i>
    {/each}
  </div>
</main>

<style>
  .map-container {
    width: 90vw;
    position: relative;
    margin: 0 auto;
    padding-top: 50%;
  }

  .dot {
    background-color: #4cc35b;
    display: block;
    position: absolute;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 100%;
    cursor: pointer;

    &::after {
      content : attr(data-name);
      position: absolute;
      bottom: 200%;
      opacity: 0;
      transition: opacity 0.3s ease-in;
      pointer-events: none;
      color: white;
      font-size: 0.75em;
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
      width: fit-content;
      padding: 0.25rem 0.5rem;
      background: black;
      border-radius: 0.2rem;
      font-style: normal;
      z-index: 5;
    }

    &:hover::after {
      opacity: 1;
    }

  }
</style>
