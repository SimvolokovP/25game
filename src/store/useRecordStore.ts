import { create } from "zustand";
import { IRecord } from "../models/IRecord";
import RecordService from "../api/supabaseApi/recordsApi";

interface RecordStore {
  currentUser: IRecord | null;
  logIn: (tg_id: number) => Promise<void>;
  updateUserRecord: (newRecord: number) => Promise<void>;
}

const useRecordStore = create<RecordStore>((set, get) => ({
  currentUser: null,
  userStatus: {
    loading: false,
    error: null,
  },
  logIn: async (tg_id) => {
    try {
      const loggedInUser = await RecordService.logIn(tg_id);
      set({ currentUser: loggedInUser });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
    }
  },
  updateUserRecord: async (newRecord) => {
    try {
      const currentUser = get().currentUser;

      if (!currentUser) {
        throw new Error("No user is currently logged in.");
      }

      const userId = currentUser.id;
      if (userId) {
        const updatedUser = await RecordService.updateUserRecord(
          userId,
          newRecord
        );
        set({ currentUser: updatedUser });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
    }
  },
}));

export default useRecordStore;
