import { useLocalStorage } from "@vueuse/core";
import { RemovableRef } from "@vueuse/shared";
import { describe, it, expect, vi, afterEach } from "vitest";
import { User } from "~~/types";
import { useFavoriteUsers } from "./useFavoriteUsers";

vi.mock("@vueuse/core", () => ({
  useLocalStorage: vi.fn((): RemovableRef<User[]> => ref([])),
}));

describe("useFavoriteUsers", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should return 0 users", () => {
    const { users, total } = useFavoriteUsers();
    expect(users.value.length).toBe(0);
    expect(total.value).toBe(0);
  });

  it("should add 3 users", () => {
    const { add, total } = useFavoriteUsers();
    add({
      name: {
        first: "TestName",
        last: "TestLastName",
      },
      login: {
        uuid: "1",
      },
    } as User);
    add({
      name: {
        first: "TestName",
        last: "TestLastName",
      },
      login: {
        uuid: "2",
      },
    } as User);
    add({
      name: {
        first: "TestName",
        last: "TestLastName",
      },
      login: {
        uuid: "3",
      },
    } as User);
    expect(total.value).toBe(3);
  });
  it("should remove user by ID", () => {
    const { users, removeById, add, total } = useFavoriteUsers();
    add({
      name: {
        first: "TestName",
        last: "TestLastName",
      },
      login: {
        uuid: "1",
      },
    } as User);
    add({
      name: {
        first: "TestName",
        last: "TestLastName",
      },
      login: {
        uuid: "2",
      },
    } as User);
    add({
      name: {
        first: "TestName",
        last: "TestLastName",
      },
      login: {
        uuid: "3",
      },
    } as User);

    removeById("2");
    users.value.forEach((user) => {
      expect(user.login.uuid).not.toBe("2");
    });

    expect(total.value).toBe(2);
  });
});
