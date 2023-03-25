import { useLocalStorage } from "@vueuse/core";
import { User } from "~~/types";

export const useFavoriteUsers = () => {
  /**
   * users hold the reactive ref to localStorage
   */
  const users = useLocalStorage<User[]>("fav-users", []);

  /**
   * A helper getter to get the total amount of favorite users
   */
  const total = computed(() => users.value.length);

  /**
   * Function will remove a user by provided ID from localStorage
   * @param uuid {string} - UUID of a user to be removed
   */
  const removeById = (uuid: string) => {
    users.value = users.value.filter((user) => user.login.uuid !== uuid);
  };

  /**
   * Function will add a new user to localStorage
   * @param user {User} - User object to be added to the lcoalStorage
   */
  const add = (user: User) => {
    users.value.push(user);
  };

  return {
    users,
    total,
    removeById,
    add,
  };
};
