<script setup lang="ts">
import { User } from "~~/types";

defineProps<{
  users: User[];
  isFavorites?: boolean;
}>();

const { removeById: removeUserById, add: addUser } = useFavoriteUsers();

/**
 * Handler for adding a new user to favorites
 * @param user {User} - User object to be added
 */
function addUserToFavorite(user: User) {
  addUser(user);
}

/**
 * Handler for removing a user from favorites
 * @param user {User} - User object to be removed
 */
function removeUserFromFavorite(user: User) {
  removeUserById(user.login.uuid);
}
</script>

<template>
  <div
    class="grid grid-cols-1 flex-wrap gap-4 justify-center lg:grid-cols-2 2xl:grid-cols-3"
  >
    <template v-for="user in users" :key="user.login.uuid">
      <UserProfileListItem
        @add="addUserToFavorite"
        @remove="removeUserFromFavorite"
        :user="user"
        :selected="isFavorites"
      />
    </template>
  </div>
</template>
