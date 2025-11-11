<script setup lang="ts">
  import { InputText, Textarea } from "primevue";
  import { ref, watch, type WatchCallback } from "vue";
  import type { IUserProfile } from "../../interfaces/UserProfile";
  import debounce from "debounce";
  import { saveProfile } from "../../service/ProfileService";

  const initialValues: IUserProfile = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  };

  const formRef = ref<IUserProfile>(initialValues);

  const onValueChange = debounce<WatchCallback<IUserProfile, IUserProfile>>(
    (values) => {
      saveProfile(values);
    },
    2000
  );

  watch(formRef, onValueChange, { deep: true });
</script>

<template>
  <h2 class="text-xl font-semibold text-primary-foreground mb-8">My Profile</h2>
  <div class="mb-8 flex max-md:justify-center">
    <img
      src="https://media.licdn.com/dms/image/v2/D5603AQG5q11u0ngVVA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1690183020804?e=1764201600&v=beta&t=F3N0t2B2vsDqfA1lElIvE348yt3lczaLC3xjlLiCHD8"
      alt="user-avatar"
      class="min-w-20 min-h-20 w-full h-full max-w-50 max-h-50 aspect-square rounded-full"
    />
  </div>
  <form class="grid grid-cols-2 max-md:flex max-md:flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="first_name" class="text-md text-primary-foreground"
        >First Name</label
      >
      <InputText
        name="first_name"
        type="text"
        placeholder="First Name"
        v-model="formRef.first_name"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label for="last_name" class="text-md text-primary-foreground"
        >Last Name</label
      >
      <InputText
        name="last_name"
        type="text"
        placeholder="Last Name"
        v-model="formRef.last_name"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label for="email" class="text-md text-primary-foreground">Email</label>
      <InputText
        name="email"
        type="text"
        placeholder="Email"
        v-model="formRef.email"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label for="phone" class="text-md text-primary-foreground">Phone</label>
      <InputText
        name="phone"
        type="text"
        placeholder="Phone"
        v-model="formRef.phone"
      />
    </div>
    <div class="flex flex-col gap-1 col-span-2">
      <label for="address" class="text-md text-primary-foreground"
        >Address</label
      >
      <Textarea
        name="address"
        type="text"
        placeholder="Address"
        rows="3"
        v-model="formRef.address"
      />
    </div>
  </form>
</template>
