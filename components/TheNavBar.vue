<script setup lang="ts">
const { total: usersAmount } = useFavoriteUsers();
</script>

<template>
  <nav class="flex gap-4 my-4">
    <NuxtLink active-class="active" class="nav-item" to="/">Home</NuxtLink>
    <NuxtLink active-class="active" class="nav-item" to="/favorites"
      >Favorites: <span class="font-bold">{{ usersAmount }}</span></NuxtLink
    >
  </nav>
</template>

<style scoped>
.nav-item {
  @apply py-2 px-4 bg-transparent hover:border-b hover:border-blue-500;
}

.active {
  @apply border-b border-blue-500;
}
</style>
