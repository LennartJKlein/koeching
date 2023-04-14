<script setup lang="ts">
useHead({
  title: 'Contact | Koeching, kinder- en jeugdtherapie op de boerderij',
  meta: [
    {
      property: 'og:title',
      content: 'Contact | Koeching, kinder- en jeugdtherapie op de boerderij',
    },
    {
      name: 'description',
      content:
        'Wil je weten hoe we jou kunnen helpen? Of heb je vragen over Koeching? Dan kun je die hier eenvoudig aan ons stellen. We reageren zo snel mogelijk!',
    },
    {
      property: 'og:description',
      content:
        'Wil je weten hoe we jou kunnen helpen? Of heb je vragen over Koeching? Dan kun je die hier eenvoudig aan ons stellen. We reageren zo snel mogelijk!',
    },
  ],
})

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
      class="mx-auto h-[19.5vw] min-h-[400px] w-full rounded-b-xl border-x-4 border-b-4 border-black lg:h-auto lg:min-h-fit lg:max-w-[1605px]"
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
    <section
      class="mx-auto max-w-3xl bg-[url(~/assets/svg/mud-steps.svg)] bg-[length:auto_100%] bg-left-bottom bg-no-repeat px-5 py-24"
    >
      <PageH2 class="mb-8 text-center text-brown-200 sm:mb-12">Gegevens</PageH2>
      <div class="sm:columns-2">
        <div class="mb-3">
          <dt class="font-bold text-brown-200">E-mail:</dt>
          <dd class="text-brown-50">info@koeching.nl</dd>
        </div>
        <div class="mb-3">
          <dt class="font-bold text-brown-200">Telefoon:</dt>
          <dd class="text-brown-50">06-53906916</dd>
        </div>
        <div class="mb-3">
          <dt class="font-bold text-brown-200">Adres:</dt>
          <dd class="text-brown-50">
            Lekdijk 13<br />
            3958 NE Amerongen
          </dd>
        </div>
        <Button
          class="my-8"
          color="brown-200"
          label="Lidnummers en certificeringen"
          small
          to="/lidmaatschappen-en-certificeringen"
          squared
        >
          Lidnummers en certificeringen
        </Button>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m10!1m3!1d76187.34184434835!2d5.354369210246417!3d51.97247369862657!2m1!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c659f5012c895b%3A0xe2ec937141719df9!2sKOECHING!5e0!3m2!1snl!2sus!4v1681189132374!5m2!1snl!2sus"
          class="aspect-video w-full border-4 border-black"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  </main>
</template>
