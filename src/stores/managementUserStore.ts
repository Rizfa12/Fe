import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/utils/axios";

export const useManagementUserStore = defineStore("managementUserStore", () => {
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const password_confirmation = ref("");
  const role = ref("staff");

  const users = ref([]);

  const register = async () => {
    try {
      const response = await axiosInstance.post("/register", {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        role: role.value,
      });

      if (response.data.success) {
        await fetchUsers();
        name.value = "";
        email.value = "";
        password.value = "";
        password_confirmation.value = "";
        role.value = "staff";
      }
    } catch (error) {
      console.error(
        "Error registering:",
        error.response?.data || error.message
      );
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      users.value = response.data.users;
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      await fetchUsers();
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
    }
  };

  return {
    name,
    email,
    password,
    password_confirmation,
    role,
    users,
    register,
    fetchUsers,
    deleteUser,
  };
});
