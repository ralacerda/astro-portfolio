<script setup lang="ts">
import type { Project } from "@/composables/getProjects";

const props = defineProps<{
  project: Project;
}>();

const src = props.project.image.image.src as string | undefined;
</script>

<template>
  <div>
    <h1>{{ project.title }}</h1>
    <div v-html="project.content" />
    <!-- {{ project.image }} -->
    <img :src="src" />
    <ul>
      <li v-for="tech in project.tech">{{ tech }}</li>
    </ul>
  </div>
</template>
