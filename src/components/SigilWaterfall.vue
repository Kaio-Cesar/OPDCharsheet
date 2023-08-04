<template>
  <canvas 
    class="canvas m-0 fixed -z-50 bg-black"
    ref="canvasRef"
    :width="vw"
    :height="vh"
  ></canvas>
</template>

<script setup lang="ts">

  import type path from 'path';
import { onMounted, ref, watch } from 'vue';
  const vw = window.innerWidth
  const vh = window.innerHeight
  
  const canvasRef:any = ref(null)
  
  onMounted(async () => {
    const canvas:any = canvasRef.value
    const ctx = canvas.getContext('2d')
    

    await loadFont('odpSigilos', 'url(../../src/assets/fonts/odpSinais.ttf)')


    // Setting up the letters
    let letters:string|string[] = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
    letters = letters.split('');

    // Setting up the columns
    const fontSize:number = 32
    ctx.font = `${fontSize}px "odpSigilos"`
    
    let columns = canvas.width / fontSize;

    // Setting up the drops
    let drops:number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    
    // Setting up the draw function
    const waterfall = (hex: string, trail_lenght:number, noise:number) => {

      ctx.fillStyle = `rgba(0, 0, 0, ${trail_lenght})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];
      
        ctx.fillStyle = hex;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;

        if (drops[i] * fontSize > canvas.height && Math.random() > noise) {
          drops[i] = 0;
        }
      }
    }
    
    
    // Loop the animation
    setInterval(waterfall, 40, '#0f5', 0.1, 0.95);
  })


  const loadFont = async (font_name:string, font_locatin:string) => {
    const font = new FontFace(font_name, font_locatin)
    document.fonts.add(font)
    await font.load()
  }
</script>
<style>

</style>