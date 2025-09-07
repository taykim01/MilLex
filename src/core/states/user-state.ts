import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserTable } from "../types";

interface UserState {
  user: UserTable;
  _setUser: (user: UserTable) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {} as UserTable,
      _setUser: (user: UserTable) => set({ user }),
    }),
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
