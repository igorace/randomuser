<script lang="ts" setup>
import type { UserResultsResponse } from "~~/types";
useHead({
  title: "Profile Generator",
});

const queryParam = { results: 5 };
const itemsToDisplay = ref(5);
const { data, pending, error, refresh } = useFetch<UserResultsResponse>(
  "https://randomuser.me/api",
  {
    query: queryParam,
  }
);

/**
 * A handler that will be fired when user click Generate button
 */
function generateProfiles() {
  queryParam.results = itemsToDisplay.value;
  refresh();
}

const MIN_RANGE = 5;
const MAX_RANGE = 20;
watch(itemsToDisplay, () => {
  if (itemsToDisplay.value > MAX_RANGE) itemsToDisplay.value = MAX_RANGE;
  if (itemsToDisplay.value < MIN_RANGE) itemsToDisplay.value = MIN_RANGE;
});

const errorMessage = computed(() => {
  if (error.value) return error.value.message;
  if (data.value && data.value.error) return data.value.error;
});
</script>

<template>
  <h1 class="text-xl font-bold my-4">Generate Random User Profiles!</h1>
  <div class="flex my-8 gap-8">
    <button
      class="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
      @click="generateProfiles"
    >
      Generate New
    </button>
    <input
      class="outline-none p-2 border rounded-md"
      type="number"
      max="20"
      min="5"
      v-model="itemsToDisplay"
    />
  </div>
  <div v-if="pending">Loading...</div>
  <div v-else-if="errorMessage" class="text-red-400">
    {{ errorMessage }}
  </div>
  <UserProfileList v-else :users="data!.results!" />
</template>

<style scoped></style>
