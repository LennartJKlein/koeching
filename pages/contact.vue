<script setup lang="ts">
const channel = ref()
const delayedContact = (newChannel: string, newUrl: string, milliseconds: number) => {
  channel.value = newChannel
  setTimeout(() => {
    window.location.href = newUrl
  }, milliseconds)
}
</script>

<template>
  <main class="min-h-screen bg-brown-600 pb-10">
    <ContactShed
      class="mx-auto h-[19.5vw] min-h-[500px] w-full max-w-[1605px] rounded-b-xl border-x-4 border-b-4 border-black"
      :channel="channel"
    >
      <SpeechBubble
        class="mx-auto -mt-1 max-w-[260px]"
        color="brown-300"
      >
        <PageTitle class="text-center text-white">Contact</PageTitle>
      </SpeechBubble>
    </ContactShed>
    <div class="flex w-full -translate-y-1/2 items-center justify-center gap-5">
      <Button
        color="white"
        label="Stuur een mailtje"
        @click="
          delayedContact(
            'email',
            'https://lennartklein260248.typeform.com/to/VCRvNx',
            3000
          )
        "
      >
        Mailen
      </Button>
      <Button
        color="white"
        label="Stuur een appje"
        @click="
          delayedContact(
            'whatsapp',
            'https://api.whatsapp.com/send?phone=31653906916',
            4000
          )
        "
      >
        Appen
      </Button>
      <Button
        color="white"
        label="Bellen met Koeching"
        @click="delayedContact('call', 'tel:+31653906916', 3000)"
      >
        Bellen
      </Button>
    </div>
  </main>
</template>
