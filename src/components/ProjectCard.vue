<script setup lang="ts">
import { getIcon } from "@/composables/getIcon";
import type { Project } from "@/composables/getProjects";

const props = defineProps<{
  project: Project;
}>();

</script>

<template>
  <div class="project">
    <div class="project__flex">
      <div class="project__text">
        <h3 class="project__title">{{ project.title }}</h3>
        <div v-html="project.content"></div>
        <a href="/"> Leia mais sobre o projeto</a>
        <ul class="project__icons" role="list">
          <li v-for="icon in project.tech" v-html="getIcon(icon)" />
        </ul>
      </div>
      <div class="project__screenshot-background">
        <a href="/" target="_blank">
          <img :src="<string>project.image.src" 
            class="project__screenshot" :alt="<string>project.image.alt"
            :height="<number>project.image.height" 
            :width="<number>project.image.width" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.project {
  margin-bottom: var(--space-2xl);
}

.project__flex {
  // margin-top: var(--space-s);
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  row-gap: var(--space-m);
  column-gap: var(--space-l);
}

.project__title {
  font-size: var(--step-2);
}

.project__icons {
  display: flex;
  column-gap: var(--space-m);
  font-size: var(--step-3);
  color: var(--bg-details);
  margin-top: var(--space-m);
}

.project__text {
  flex: 1 1 400px;
  // max-width: 70ch;
}

.project__screenshot {
  height: auto;
  transition: box-shadow 200ms, transform 200ms;
  border-radius: 3px;
  @include shadow;

  &:hover {
    transform: translate(-0.5rem, -0.5rem);
  }
}

.project__screenshot-background {
  border-radius: 4px;
  background-color: var(--danger);
}
</style>
