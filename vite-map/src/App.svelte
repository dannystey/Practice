<script>
  import Counter from './lib/Counter.svelte'
  import cities from './data/cities-test.json';
</script>

<main>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>
  <ul>
    {#each cities as city,i}
      <li>
          {i + 1} {city.name}
      </li>
    {/each}
  </ul>

</main>

<style>
.dot {
  background-color: #4cc35b;
}
</style>
