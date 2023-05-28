<script setup>
import logInfo from '../assets/info'
import {ref} from "vue";
import { useStore} from 'vuex'
import {useRouter} from "vue-router";

let email=ref(null )
let password=ref(null)
const store = useStore();
const router= useRouter();
console.log(logInfo.loginInfo)
let badCredentials=ref(false)
const login = () => {

  if (email.value.value === logInfo.loginInfo.username && password.value.value === logInfo.loginInfo.password) {
    console.log('logged in');
    badCredentials.value = false;

console.log(store.getters.log)
    store.commit('setLoggedIn');
localStorage.setItem('loggedIn', '1')

    router.push('/info');
  } else {
    email.value.value = '';
    password.value.value = '';
    badCredentials.value = true;
  }
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img  class="mr-5" src="/bitwarden.svg" alt="Bitwarden Icon">
        Bitwarden
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <p :class="badCredentials ? ' text-red-500 p-5 border-red-500 rounded-lg border': 'hidden'">Wrong credentials</p>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input ref="email" value="customer@mail.com" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input value="123" ref="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div class="flex items-center justify-between">
         </div>
            <button type="submit" class="w-full border border-gray-400 bg-primary-600 hover:bg-primary-700 focus:ring-4 text-black focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>