import supabase from "../../database/supabase";
import { IRecord } from "../../models/IRecord";

export default class RecordService {
  static async getByTgId(tg_id: number) {
    try {
      const { data: user, error } = await supabase
        .from("records")
        .select()
        .eq("tg_id", tg_id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.warn("Error getting user:", error);
        throw new Error("Failed to get user.");
      }

      return user;
    } catch (error) {
      console.warn("Failed to retrieve user by tg_id:", error);
      throw error;
    }
  }

  static async getUsersByRecord(limit: number = 10) {
    try {
      const { data: users, error } = await supabase
        .from("records")
        .select()
        .order("record", { ascending: true })
        .limit(limit);

      if (error) {
        console.warn("Error getting users:", error);
        throw new Error("Failed to get users.");
      }

      return users;
    } catch (error) {
      console.warn("Failed to retrieve all users:", error);
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const { data: users, error } = await supabase.from("records").select();

      if (error) {
        console.warn("Error getting users:", error);
        throw new Error("Failed to get users.");
      }

      return users;
    } catch (error) {
      console.warn("Failed to retrieve all users:", error);
      throw error;
    }
  }

  static async getById(id: number) {
    try {
      const { data: user, error } = await supabase
        .from("records")
        .select()
        .eq("id", id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.warn("Error getting user:", error);
        throw new Error("Failed to get user.");
      }

      return user;
    } catch (error) {
      console.warn("Failed to retrieve user by id:", error);
      throw error;
    }
  }

  static async insertNewUser(tg_id: number) {
    try {
      const newRecord: IRecord = {
        tg_id: tg_id,
        record: 1000,
      };

      const { data: insertedUser, error: userError } = await supabase
        .from("records")
        .insert([newRecord])
        .select("*")
        .single();

      if (userError) {
        console.warn("Insert User Error:", userError);
        throw new Error("Failed to insert user.");
      }

      return insertedUser;
    } catch (error) {
      console.warn("Failed to insert new user:", error);
      throw error;
    }
  }

  static async logIn(tg_id: number) {
    try {
      let user = await this.getByTgId(tg_id);

      if (!user) {
        const newRecord: IRecord = {
          tg_id: tg_id,
          record: 0,
        };
        user = await this.insertNewUser(newRecord.tg_id);
      }
      return user;
    } catch (error) {
      console.warn("Error in logIn:", error);
      throw new Error("An error occurred during the operation.");
    }
  }

  static async updateUserRecord(id: number, newRecord: number) {
    try {
      const { data: updatedUser, error } = await supabase
        .from("records")
        .update({ record: newRecord })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.warn("Error updating user record:", error);
        throw new Error("Failed to update user record.");
      }

      return updatedUser;
    } catch (error) {
      console.warn("Failed to update user record:", error);
      throw error;
    }
  }
}
