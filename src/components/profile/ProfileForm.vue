<script setup lang="ts">
  import { onMounted, ref, watch, type WatchCallback } from "vue";
  import {
    Avatar,
    FileUpload,
    InputText,
    Textarea,
    Toast,
    type FileUploadSelectEvent,
  } from "primevue";
  import debounce from "debounce";
  import { useToast } from "primevue/usetoast";
  import { getProfile, saveProfile } from "../../service/ProfileService";
  import type { IUserProfile } from "../../interfaces/UserProfile";

  const toast = useToast();

  const initialValues: IUserProfile = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    picture: "",
  };
  const formRef = ref<IUserProfile>(initialValues);

  onMounted(() => {
    onLoadProfile();

    watch(formRef, onSaveForm, {
      deep: true,
    });
  });

  const onLoadProfile = () => {
    const profile = getProfile();
    if (profile) formRef.value = profile;
  };

  const onSaveForm = debounce<WatchCallback<IUserProfile, IUserProfile>>(
    (values) => {
      toast.add({
        life: 3000,
        summary: "Saving...",
        severity: "info",
      });

      saveProfile(values);

      toast.add({
        life: 3000,
        summary: "Saved",
        detail: "Prfile has been successfully updated!",
        severity: "success",
      });
    },
    2000
  );

  const onUploadPicture = (event: FileUploadSelectEvent) => {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      formRef.value.picture = e?.target?.result as string;
    };

    reader.readAsDataURL(file);
  };
</script>

<template>
  <h2 class="text-xl font-semibold text-primary-foreground mb-8">My Profile</h2>
  <div class="mb-8 flex max-md:justify-center">
    <div
      class="relative min-w-20 min-h-20 w-full h-full max-w-50 max-h-50 aspect-square rounded-full overflow-hidden"
    >
      <img v-if="formRef.picture" :src="formRef.picture" alt="user-avatar" />
      <Avatar
        v-if="!formRef.picture"
        icon="pi pi-user"
        class="w-full! h-full!"
        size="xlarge"
        shape="circle"
      />
      <div
        class="group absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-2 w-full h-full hover:bg-gray-800/50"
      >
        <FileUpload
          choose-label="Edit Picture"
          choose-icon="pi pi-pencil"
          mode="basic"
          @select="onUploadPicture"
          customUpload
          auto
          severity="secondary"
          class="m-auto whitespace-nowrap bg-primary/60! rounded flex gap-2 items-center invisible group-hover:visible"
        />
      </div>
    </div>
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
        type="email"
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

  <Toast />
</template>
