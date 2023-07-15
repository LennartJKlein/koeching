<script setup lang="ts">
withDefaults(
  defineProps<{
    heading?: string
  }>(),
  {
    heading: 'Nog eerder op de hoogte zijn? Meld je aan voor onze nieuwsbrief',
  }
)
</script>

<template>
  <div
    :class="[
      'relative max-w-2xl -rotate-1 rounded-xl bg-gradient-to-br from-[rgb(255_255_255/60%)] via-[rgb(255_255_255/35%)] to-[rgb(255_255_255/50%)] p-2 shadow-sm',
      'before:-z-1 before:absolute before:bottom-6 before:right-[16px] before:top-3/4 before:w-3/4 before:rotate-1 before:skew-x-3 before:skew-y-3 before:bg-black before:opacity-30 before:shadow-[0_0_15px_8px_#5a5041]',
    ]"
  >
    <div
      class="relative flex h-full flex-wrap items-end justify-stretch gap-3 rounded-sm bg-gray-50 px-3 py-5 shadow-[inset_-1px_-2px_0_#ccc,inset_2px_2px_0_white]"
    >
      <h2 class="mb-5 w-full font-display text-3xl/none font-bold text-[#5F72E3]">
        {{ heading }}
      </h2>
      <FormKit
        type="form"
        action="https://koeching.us14.list-manage.com/subscribe/post?u=0598046e23224853f37d18efb&amp;id=86897af97d&amp;f_id=00719de0f0"
        method="post"
        id="mailchimp"
        form-class="grow"
        name="mailchimp"
        target="_blank"
        submit-label="Aanmelden"
        :submit-attrs="{
          wrapperClass:
            'border-x-none border-t-none group relative z-10 flex cursor-pointer select-none w-fit items-center justify-center border-b-transparent outline-none active:border-b-[4px]',
          inputClass: {
            'font-normal': false,
            'bg-blue-600': false,
            'text-white': false,
            'text-sm': false,
            rounded: false,
            [`mt-3 relative flex w-full items-center justify-center rounded-3xl before:rounded-3xl after:rounded-3xl text-lg border-b-[4px] border-b-transparent text-center font-bold text-black shadow-[0_0_0_2px_#18181b] before:absolute before:left-0 before:top-[5px] before:-z-10 before:h-full before:w-full before:bg-gray-300 before:content-[''] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:bg-white after:content-[''] group-hover:after:bg-gray-100 group-active:translate-y-[4px] group-active:border-b-0 group-active:before:invisible`]: true,
          },
        }"
      >
        <FormKit
          inner-class="bg-white"
          label="E-mail *"
          name="EMAIL"
          type="email"
          id="mce-EMAIL"
          validation="required:trim|email"
        />
        <FormKit
          inner-class="bg-white"
          name="FNAME"
          label="Voornaam"
          id="mce-FNAME"
          type="text"
          validation="trim"
        />
        <FormKit
          type="hidden"
          name="tags"
          value="7404238"
        />
        <div
          aria-hidden="true"
          style="position: absolute; left: -5000px"
        >
          <input
            type="text"
            name="b_0598046e23224853f37d18efb_86897af97d"
            tabindex="-1"
            value
          />
        </div>
      </FormKit>
      <img
        class="mx-auto w-full max-w-[10rem] shrink animate-fly-in will-change-transform"
        src="~/assets/webp/mailbox.webp"
        alt="Mailbox"
      />
    </div>
  </div>
</template>
