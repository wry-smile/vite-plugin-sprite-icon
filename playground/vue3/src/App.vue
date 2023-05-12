<script setup lang="ts">
import { icon1, icon2 } from './assets/sprite-icon/icons.json'
</script>

<template>
  <section>
    <svg>
      <use xlink:href="#icon-skintest" />
    </svg>
    <svg>
      <use :xlink:href="icon1" />
    </svg>
    <svg>
      <use :xlink:href="icon2" />
    </svg>
  </section>
</template>

<style scoped>
</style>
