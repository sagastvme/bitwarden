
<script setup>
import information from '../assets/info.json'
import {BiBalloonHeart, MdSaveas, MdSaveasOutlined, MdSaveasSharp} from "oh-vue-icons/icons";
import {BiThreeDotsVertical} from "oh-vue-icons/icons";
import {IoCopyOutline} from "oh-vue-icons/icons";
import {BiPlusCircleFill} from "oh-vue-icons/icons";
import {FaCopy} from "oh-vue-icons/icons";
import {FaWindowClose} from "oh-vue-icons/icons";
import {IoCopy} from "oh-vue-icons/icons";
import {CoCopy} from "oh-vue-icons/icons";
import {addIcons} from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/pi";

const Fa = Object.values({...FaIcons});


addIcons(BiBalloonHeart, BiThreeDotsVertical, BiPlusCircleFill, FaWindowClose, CoCopy, FaCopy, IoCopyOutline, IoCopy, MdSaveas, MdSaveasOutlined, ...Fa);

import {reactive, ref} from 'vue';

const data = reactive({
  // Your reactive data properties
  passwords: information.information,
});


const ventana = ref(null);
const addDataDialog = ref(null)
let copyEmail = ref(false);
let copyPassword = ref(false);


let savedChanges = ref(true)

let emailInput = ref(null)
let passwordInput = ref(null)
let customNameInput = ref(null)

let addEmailInput = ref(null)
let addPasswordInput = ref(null)
let addCustomNameInput = ref(null)


let index = ref(0)

const pokemonIcons = Object.values(FaIcons)

// Fisher-Yates shuffle algorithm
for (let i = pokemonIcons.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [pokemonIcons[i], pokemonIcons[j]] = [pokemonIcons[j], pokemonIcons[i]];
}


const openModal = (indexR) => {
  console.log('setead')
  ventana.value.showModal();

  index = indexR
  passwordInput.value.value = information.information[index].password

  emailInput.value.value = (information.information[index].email)
  customNameInput.value.value = (information.information[index].customName)


};
const copyToClipboard = (reference, name) => {

  switch (name) {
    case 'email':
      copyEmail.value = !copyEmail.value
      break;
    case 'password':
      copyPassword.value = !copyPassword.value
      break;
  }
  navigator.clipboard.writeText(reference.value);

}


const generatePassword = () => {

  let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let passwordLength = 12;
  let password = "";
  for (let i = 0; i <= passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  copyPassword.value = false

  passwordInput.value.value = password

}
const generateNewPassword = () => {

  let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let passwordLength = 12;
  let password = "";
  for (let i = 0; i <= passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  copyPassword.value = false

  addPasswordInput.value.value = password

}


const saveChanges = () => {

  savedChanges.value = false
  information.information[index].customName = customNameInput.value.value
  information.information[index].email = emailInput.value.value
  information.information[index].password = passwordInput.value.value


}


function  addChanges(){
  console.log(data.passwords)
  if (
      addCustomNameInput.value.value !== '' &&
      addEmailInput.value.value !== '' &&
      addPasswordInput.value.value !== ''

  ) {
    let newPassword= {
      "customName": addCustomNameInput.value.value,
      "email": addEmailInput.value.value,
      "password":  addPasswordInput.value.value
    }
    data.passwords.push(newPassword)


  } else {
    console.log('vacio')
  }
  /*
  *  {
      "customName": "GitHub Login",
      "email": "bob.johnson@example.com",
      "password": "StrongP@ssw0rd!"
    },*/

  addDataDialog.value.close();
  addCustomNameInput.value.value = ''
  addEmailInput.value.value = ''
  addPasswordInput.value.value = ''
}

const reset = (event) => {
  copyPassword.value = false;
  savedChanges.value = true;
  copyEmail.value = false;
  const dialog = event.target.closest('dialog');

  dialog.close();
};


const resetCopyVariables = () => {
  copyEmail.value = false
  copyPassword.value = false
  savedChanges.value = true
}

const closeDialog = (event) => {
  const dialogDimension = event.target.getBoundingClientRect();

  if (
      event.target instanceof HTMLDialogElement && // Check if the target is a dialog element
      (event.clientX < dialogDimension.left ||
          event.clientX > dialogDimension.right ||
          event.clientY < dialogDimension.top ||
          event.clientY > dialogDimension.bottom)

  ) {
    event.target.close();
  }
};

const addData = () => {
  addDataDialog.value.showModal();
}
</script>


<template>
  <div>
    <ul class="">
      <li class="flex-row flex  p-2" v-for="(i, index) in data.passwords"
          :key="i.customName">
        <div>
          <v-icon class="bg-gray-500 rounded-lg bg-opacity-40 shadow-2xl" scale="5" :name="pokemonIcons[index].name"/>
        </div>
        <div class="ml-5 items-center justify-center  w-full flex flex-col">

          <button @click="openModal(index)" class="text-2xl text-blue-400 hover:underline">{{ i.customName }}</button>
          <span>{{ i.email }}</span>
        </div>
        <div class=" flex items-center justify-center ml-auto">
          <button @click="openModal(index)">
            <v-icon class="" name="bi-three-dots-vertical" hover animation="float" scale="1.5"/>
          </button>
        </div>
      </li>
    </ul>






















    <dialog @click="closeDialog" class="bg-gray-300 shadow-2xl w-full h-full md:h-2/3  rounded-lg"
            ref="addDataDialog">
      <button @click="reset">
        <v-icon name="fa-window-close"/>
      </button>

      <div class="flex flex-col w-2/3 mx-auto  gap-8 items-center justify-center  h-3/4 ">
        <div class="  w-full  gap-5 flex md:flex-row  flex-col items-center justify-center   ">
          <span class="md:mr-auto">Email:</span> <input type="email" name="email" id="email" class="rounded-lg"
                                                        @input="resetCopyVariables" ref="addEmailInput">
          <button @click="copyToClipboard(emailInput, 'email')" class="ml-2">
            <v-icon :name="!copyEmail ? 'io-copy-outline' : 'io-copy'" scale="1.5"/>

          </button>

        </div>

        <div class="w-full gap-5 flex md:flex-row  flex-col items-center">
          <span class="md:mr-auto">Password:</span> <input type="email" name="email" id="email" class="rounded-lg"
                                                           @input="resetCopyVariables" ref="addPasswordInput"
        >

          <button @click="copyToClipboard(passwordInput, 'password')" class="ml-2">
            <v-icon :name="!copyPassword ? 'io-copy-outline' : 'io-copy'" scale="1.5"/>
          </button>

        </div>
        <div class="flex flex-col md:flex-row items-center md:gap-0 gap-8  w-full"><span class="mr-auto">Custom name:</span> <input type="email" name="email" id="email"
                                                                                                                                    @input="resetCopyVariables"
                                                                                                                                    class="rounded-lg "
                                                                                                                                    ref="addCustomNameInput"
        >

        </div>
        <div class="flex  w-full">
          <button @click="generateNewPassword" class="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">Generate random
            password
          </button>

        </div>

        <div class="flex  w-full">

          <button @click="addChanges" class="border-black border p-5 w-full rounded-lg">
            <span>Save changes</span>
            <v-icon class="ml-5" scale="1.25" name="md-saveas-outlined"/>
          </button>

        </div>

      </div>

    </dialog>



















    <dialog @click="closeDialog" class="bg-gray-300 shadow-2xl w-full h-full md:h-2/3  rounded-lg"
            ref="ventana">
      <button @click="reset">
        <v-icon name="fa-window-close"/>
      </button>

      <div class="flex flex-col w-2/3 mx-auto  gap-8 items-center justify-center  h-3/4 ">
        <div class=" w-full  gap-5 flex md:flex-row  flex-col items-center justify-center">
          <span class="md:mr-auto">Email:</span> <input type="email" name="email" id="email" class="rounded-lg"
                                                        @input="resetCopyVariables" ref="emailInput">
          <button @click="copyToClipboard(emailInput, 'email')" class="ml-2">
            <v-icon :name="!copyEmail ? 'io-copy-outline' : 'io-copy'" scale="1.5"/>
          </button>

        </div>

        <div class=" w-full gap-5 flex md:flex-row  flex-col items-center ">
          <span class="md:mr-auto">Password:</span> <input type="email" name="email" id="email" class="rounded-lg"
                                                           @input="resetCopyVariables" ref="passwordInput"
        >

          <button @click="copyToClipboard(passwordInput, 'password')" class="ml-2">
            <v-icon :name="!copyPassword ? 'io-copy-outline' : 'io-copy'" scale="1.5"/>
          </button>

        </div>
        <div class="flex flex-col md:flex-row items-center md:gap-0 gap-8  w-full">
          <span class="md:mr-auto">Custom name:</span> <input type="email" name="email" id="email"
                                                              @input="resetCopyVariables"
                                                              class=" rounded-lg "
                                                              ref="customNameInput"
        >

        </div>
        <div class="flex  w-full">
          <button @click="generatePassword" class="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">Generate random
            password
          </button>

        </div>

        <div class="flex  w-full">

          <button @click="saveChanges" class="border-black border p-5 w-full rounded-lg ">
            <span>Save changes</span>
            <v-icon class="ml-5" scale="1.25" :name="savedChanges ? 'md-saveas-outlined' : 'md-saveas'"/>
          </button>

        </div>

      </div>

    </dialog>
    <div class="fixed bottom-0 right-5 mb-4 mr-4">
      <button @click="addData">
        <v-icon name="bi-plus-circle-fill" hover animation="wrench" class="fill-blue-700  w-14 h-14"/>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>