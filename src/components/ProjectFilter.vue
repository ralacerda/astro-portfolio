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

const all = "Todos";

const value: Ref<Tech | typeof all> = ref(all);
const filterValues: (typeof all | Tech)[] = [
  all,
  "Vue",
  "Astro",
  "Typescript",
  "Javascript",
  "Tailwind",
  "CSS3",
];

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
  <div class="filter">
    <div class="filter__controls">
      <!-- <h2>{{ value }}</h2> -->

      <div class="filter__icons">
        <template v-for="tech in filterValues" :key="tech">
          <input
            type="radio"
            name="fav_language"
            :value="tech"
            v-model="value"
            :id="tech"
          />
          <label v-html="getFilterIcon(tech)" :for="tech"></label>
        </template>
      </div>
    </div>
    <div class="filter__result">
      <TransitionGroup name="list">
        <template
          v-for="project in projectsFiltered"
          :key="project.title"
          class="filter__projects"
        >
          <ProjectCard :project="project" />
        </template>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss">
.filter__controls {
  border-bottom: 1px solid var(--fg-details);
  margin-bottom: var(--space-m);
}

.filter__icons {
  position: sticky;
  top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
  margin-block: var(--space-s);
  font-size: var(--step-3);
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
  width: calc(clamp(16rem, 90vw, 90rem) - (var(--space-l-xl) * 2));
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
}

input:checked + label {
  color: var(--danger);
}

input:hover:not(:checked) + label {
  color: var(--fg);
}
</style>
