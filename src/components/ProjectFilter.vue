<script setup lang="ts">
import { computed, ref } from "vue";
import type { Ref } from "vue";
import ProjectCard from "./ProjectCard.vue";
import type { Project } from "@/composables/getProjects";
import type { Tech } from "@/composables/getIcon";
import { getIcon } from "@/composables/getIcon";
import noFilterIcon from "~icons/mdi/filterOff?raw";

const props = defineProps<{
  projects: Project[];
}>();

const all = "Todos projetos";

const value: Ref<Tech | typeof all> = ref(all);
const filterValues: (typeof all | Tech)[] = [all, "Vue", "Astro"];

function sortProject(prev: Project, next: Project) {
  return next.weight - prev.weight;
}

function getFilterIcon(name: typeof all | Tech) {
  if (name == all) {
    return noFilterIcon;
  }
  return getIcon(name);
}

const projectsFiltered = computed(() => {
  if (value.value != all) {
    return props.projects
      .filter((project) => project.tech.includes(<Tech>value.value))
      .sort(sortProject);
  }
  return props.projects.sort(sortProject);
});
</script>

<template>
  <div class="filter__control">
    <div v-for="tech in filterValues" :key="tech">
      <input
        type="radio"
        name="fav_language"
        :value="tech"
        v-model="value"
        :id="tech"
      />
      <label v-html="getFilterIcon(tech)" :for="tech"></label>
    </div>
  </div>
  <h3>{{ value }}</h3>
  <TransitionGroup name="list">
    <div v-for="project in projectsFiltered" :key="project.title">
      <ProjectCard :project="project" />
    </div>
  </TransitionGroup>
</template>

<style lang="scss">
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.filter__control {
  display: flex;
  gap: 2rem;
}

input {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
}

input + label {
  color: var(--gray);
  font-size: var(--step-3);
}

input:checked + label {
  color: var(--danger);
}

input:hover:not(:checked) + label {
  color: var(--fg);
}
</style>
