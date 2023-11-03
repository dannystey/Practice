<script>
  import cities from './data/cities-test.json';
  let query='';
  let checkstart = (item, input) => item.name.toLowerCase().startsWith(input.toLowerCase());
  $:filteredCities = query && query.length ? cities.filter(item => checkstart(item, query)) : cities; //computed
</script>

<main>
  <div class="city-filter">
    <label for="city-filter-input">City</label>
    <input type="text" bind:value={query} id="city-filter-input">
  </div>
  <div class="map-container">
    {#each cities as city}
      <i class="dot" data-name="{city.name} {city.country_name}" 
      style:left="{(Number(city.longitude) + 180)/3.6}%"
      style:bottom="{(Number(city.latitude) + 90)/1.8}%"
      class:hide={query && query.length && !city.name.toLowerCase().startsWith(query.toLowerCase())}
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
  .city-filter {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;
  }

  .dot {
    background-color: #4cc35b;
    display: block;
    position: absolute;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 100%;
    cursor: pointer;
    transition: opacity 0.3s ease-in;

    &.hide {
      opacity: 0;
    }

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
