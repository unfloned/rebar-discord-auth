<script setup lang="ts">
  import '../translate/index.js';

  import {useTranslate} from "@Shared/translate.js";
  const translation = useTranslate();

</script>

<template>
  <div class="flex items-center justify-center h-screen w-full">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-200">{{ translation.t("discord.auth.title") }}</h1>
      <p class="text-xl text-gray-100">{{ translation.t("discord.auth.subtile") }}</p>
      <div class="mt-4 bg-blue-800 border border-blue-950 text-white px-4 py-3 rounded relative" role="alert">
        <svg class="w-5 h-5 mr-1 inline items-center justify-center" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-3a1 1 0 100-2 1 1 0 000 2zm0 2a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z" clip-rule="evenodd"/>
        </svg>
        <span class="inline ml-5">{{ translation.t("discord.auth.information") }}</span>
      </div>
    </div>
  </div>
</template>
