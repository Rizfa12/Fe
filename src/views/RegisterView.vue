<template>
    <div class="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 class="mb-6 text-2xl font-bold text-center text-gray-800">Register</h2>
        <form @submit.prevent="register" class="space-y-4">
            <div class="form-group">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" v-model="name" required
                    class="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-300" />
            </div>

            <div class="form-group">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" v-model="email" required
                    class="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-300" />
            </div>

            <div class="form-group">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" v-model="password" required
                    class="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-300" />
            </div>

            <div class="form-group">
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" id="password_confirmation" v-model="password_confirmation" required
                    class="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-300" />
            </div>

            <div class="form-group">
    <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
    <select id="role" v-model="role" required
        class="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-300">
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
    </select>
</div>

            <button type="submit"
                class="w-full py-2 font-semibold text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-500">
                Register
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '@/utils/axios';

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const router = useRouter();
const role = ref('staff');

const register = async () => {
    try {
        const response = await axiosInstance.post('/register', {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
            role: role.value,   
        });

        if (response.data.success) {
            router.push('/login');
        }
    } catch (error) {
        console.error('Error registering:', error.response?.data || error.message);
    }
};
</script>

<style scoped>
</style>
