<script setup lang="ts">
import { User } from "~~/types";
import { useDateFormat } from "@vueuse/core";

const props = defineProps<{
  user: User;
  selected?: boolean;
}>();

const emits = defineEmits<{
  (e: "remove", user: User): void;
  (e: "add", user: User): void;
}>();

const formatter = ref("DD.MM.YYYY");
const formattedDOB = useDateFormat(props.user.dob.date, formatter);
const selected = ref(props.selected ?? false);

const daysTillBD = daysUntilBirthday(props.user.dob.date);

/**
 * Handler to fire proper event based on selected property
 */
function toggleFavorite() {
  // if it's already selected fire remove event
  if (selected.value) {
    emits("remove", props.user);
  }
  // otherwise fire add event
  else {
    emits("add", props.user);
  }
  selected.value = !selected.value;
}
</script>

<template>
  <div
    class="flex md:flex-row font-sans shadow-md p-2 border rounded-md grow flex-col"
  >
    <div class="flex justify-center">
      <img
        :src="user.picture.large"
        :alt="user.name.first"
        class="rounded-md object-cover"
        loading="lazy"
      />
    </div>
    <div class="flex-auto p-6 sm:p-2">
      <div class="flex items-center">
        <h1 class="flex-auto text-lg font-semibold text-slate-900">
          {{ user.name.first }} {{ user.name.last }}
        </h1>
        <button
          class="flex-none flex items-center justify-center w-9 h-9 ml-2 rounded-md text-slate-300 border border-slate-200 hover:opacity-75"
          type="button"
          aria-label="Like"
          @click="toggleFavorite"
        >
          <svg
            width="20"
            height="20"
            :fill="selected ? 'red' : 'gray'"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            />
          </svg>
        </button>
      </div>
      <div class="flex flex-col">
        <span
          >Age: <span class="font-bold">{{ user.dob.age }}</span>
        </span>
        <span
          >Born: <span class="font-bold">{{ formattedDOB }}</span>
        </span>
        <span
          >Days till BD: <span class="font-bold">{{ daysTillBD }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
