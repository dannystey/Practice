<script lang="ts">
  import { beforeUpdate, onMount } from "svelte";

  export let coords: {x: number, y: number, index: number}[];
  export let cityNames: string[] = [];
  let currentCity = '';
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  const citySize = 1;

  const setCity = (index: number) => {
    currentCity = cityNames[index];
  };

  beforeUpdate(() => {
    requestAnimationFrame(() => drawCities());
  })

  const drawCities = () => {
    if (context) {
      context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      coords.forEach((coord) => {
        context.fillStyle = 'white'
        context.fillRect(coord.x, coord.y, citySize, citySize);
      })
    }
  }
  
  const hoverCity = (e: MouseEvent) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;
    const coordMatch = coords.find((coord) => {
      return Math.floor(coord.x) <= mouseX && 
        Math.ceil(coord.x) + citySize >= mouseX && 
        Math.floor(coord.y) <= mouseY && 
        Math.ceil(coord.y) + citySize >= mouseY;
    })
    if (coordMatch) {
      setCity(coordMatch.index);
    } else {
      currentCity = '';
    }
  }

  onMount(() => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context = canvas.getContext('2d') as CanvasRenderingContext2D;
    drawCities();

    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    })
  })
</script>

<canvas bind:this={canvas} on:mousemove={hoverCity} />
{#if currentCity}
<div class="tooltip">{currentCity}</div>
{/if}


<style>
  canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .tooltip {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%);
      font-size: 20px;
      color: white;
      padding: 8px;
      border-radius: 4px;
      background: rgba(0,0,0, 0.5);
      font-family: arial, sans-serif;
    }
</style>