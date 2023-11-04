<script lang="ts">
  import { latLngToXY } from "$lib/convertCoords";
  import { onMount } from "svelte";
  import Map from "../components/map.svelte";

  let map: HTMLDivElement;
  let cities: string[];
  let currentCity = "";
  let query = '';
  let coordData: { x: number; y: number; index: number }[] = [];
  let filteredCoordData: { x: number; y: number; index: number }[] = [];

  const loadData = async () => {
    let coords: { x: number; y: number; index: number }[] = [];
    const response = await fetch("/data/latlong.json");
    const data: number[] = await response.json();
    for (let i = 0; i < data.length; i += 2) {
      coords.push({
        index: i / 2,
        ...latLngToXY(data[i], data[i + 1], map.offsetWidth, map.offsetHeight),
      });
    }
    coordData = coords;
    filteredCoordData = coords;

    window.addEventListener('resize', () => {
      coords = [];
      for (let i = 0; i < data.length; i += 2) {
        coords.push({
          index: i / 2,
          ...latLngToXY(data[i], data[i + 1], map.offsetWidth, map.offsetHeight),
        });
      }
      coordData = coords;
      filteredCoordData = coords;
    })
    
    return coords;
  };

  let timeout: number;
  const filter = () => {
    !!timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (cities && query) {
        const ind: number[] = [];
        cities.forEach((city, i) =>{
          if(city.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            ind.push(i);
          }
        })
        filteredCoordData = coordData.filter((coord) => ind.includes(coord.index))
      } else {
        filteredCoordData = coordData;
      }
    }, 300);
  }

  const loadStrings = async () => {
    const response = await fetch("/data/citystrings.json");
    return await response.json();
  };

  onMount(async () => {
    await loadData();
    cities = await loadStrings();
  });
</script>

<input bind:value={query} on:keyup={filter} type="text"/>
<div class="map" bind:this={map}>
    <Map bind:coords={filteredCoordData} bind:cityNames={cities} />
    <span>{filteredCoordData.length} Cities</span>
</div>

<style lang="scss">
  .map {
    width: calc(100% - 60px);
    padding-top: 50%;
    background: #002649;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    margin: 0 30px;
  }
  input {
    background: #3b3b3b;
    border-radius: 4px;
    padding: 10px 15px;
    color: white;
    margin: 0 0 16px;
    border: 0;
  }
  span {
    color: white;
    padding: 4px;
    font-family: arial, sans-serif;
    font-size: 12px;
  }
</style>
