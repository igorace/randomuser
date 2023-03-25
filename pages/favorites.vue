<script lang="ts" setup>
useHead({
  title: "Favorite Profiles",
});

const { users, total: usersAmount } = useFavoriteUsers();
</script>

<template>
  <h1 class="text-xl font-bold my-8">Favorites:</h1>
  <UserProfileList :users="users" :is-favorites="true" />
  <div v-if="!usersAmount">You don't have any user in Favorites 😞</div>
</template>

<style scoped></style>
