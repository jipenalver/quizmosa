<script setup lang="ts">
import { ref } from 'vue'
import { fadeDuration } from './homeIntroScene'
import { useHomeIntro } from './useHomeIntro'

const emit = defineEmits<{ done: [] }>()

const canvas = ref<HTMLCanvasElement | null>(null)

const { isLeaving, isCreditVisible, onSkip } = useHomeIntro(canvas, () => emit('done'))
</script>

<template>
  <div
    :class="{ 'home-intro--leaving': isLeaving }"
    :style="{ '--fade': `${fadeDuration}ms` }"
    class="home-intro"
    @click="onSkip"
  >
    <canvas ref="canvas" aria-hidden="true" class="home-intro__canvas"></canvas>

    <p
      :class="{ 'home-intro__credit--visible': isCreditVisible }"
      class="home-intro__credit text-body-medium text-muted"
    >
      created by:
      <a
        class="text-primary"
        href="https://jipenalver.github.io/"
        rel="noopener"
        target="_blank"
        @click.stop
      >
        Jabez Ian Chris D. Penalver
      </a>
    </p>

    <v-btn class="home-intro__skip" size="small" variant="text" @click.stop="onSkip">Skip</v-btn>
  </div>
</template>

<style scoped>
.home-intro {
  background: rgb(var(--v-theme-background));
  cursor: pointer;
  inset: 0;
  position: fixed;
  transition: opacity var(--fade) ease;
  z-index: 2000;
}

.home-intro--leaving {
  opacity: 0;
}

.home-intro__canvas {
  display: block;
  height: 100%;
  width: 100%;
}

/* Sits just under the logo, whose height follows the same limits as the scene. */
.home-intro__credit {
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: calc(50% + min(7.8vw, 15vh, 81px) + 32px);
  transform: translateY(8px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  visibility: hidden;
}

.home-intro__credit--visible {
  opacity: 1;
  transform: none;
  visibility: visible;
}

.home-intro__skip {
  bottom: 24px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
}
</style>
