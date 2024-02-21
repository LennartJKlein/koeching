<script setup lang="ts">
import { reset } from '@formkit/core'
import type {
  ApiActivityActivity,
  ApiParticipantParticipant,
  ApiSeminarSeminar,
  ApiTrainingTraining,
  DetailsMoment,
} from '@/types'

// Props
const props = withDefaults(
  defineProps<{
    activity?: ApiActivityActivity
    group?: DetailsMoment
    seminar?: ApiSeminarSeminar
    training?: ApiTrainingTraining
  }>(),
  {
    activity: undefined,
    group: undefined,
    seminar: undefined,
    training: undefined,
  }
)

// Submission
const isSubmitSuccesfull = ref()
const formData = ref()
const submitForm = async (fields: any) => {
  const { create } = useStrapi()

  const { data } = await create<ApiParticipantParticipant>('participants', {
    ...fields,
    moment: props.group && {
      description: props.group.description,
      end_date: props.group.end_date,
      open: props.group.open,
      start_date: props.group.start_date,
      title: props.group.title,
    },
    training: props.training?.id,
    seminar: props.seminar?.id,
    activity: props.activity?.id,
  })
  if (data) {
    isSubmitSuccesfull.value = true
    reset('participation-form')
  } else {
    isSubmitSuccesfull.value = false
  }
}

// Fetch full address from API
watch(
  () => ({ ...formData.value }),
  (input) => {
    if (input.contact?.address?.postalCode && input.contact?.address?.streetNr) {
      fetchAddress(input.contact.address.postalCode, input.contact.address.streetNr)
    }
  },
  { deep: true }
)
const isFetchingAddress = ref(false)
const foundAddress = ref(false)
const lastStreetNr = ref()
const lastPostalCode = ref()
async function fetchAddress(postalCodeInput: String, streetNrInput: String) {
  if (
    !isFetchingAddress.value &&
    postalCodeInput &&
    streetNrInput &&
    (postalCodeInput !== lastPostalCode.value || streetNrInput !== lastStreetNr.value)
  ) {
    isFetchingAddress.value = true
    lastPostalCode.value = postalCodeInput
    lastStreetNr.value = streetNrInput
    const postalCode = encodeURIComponent(postalCodeInput.replaceAll(' ', ''))
    const streetNr = encodeURIComponent(streetNrInput.replaceAll('-', ''))
    const { data } = await useFetch<{
      response: {
        docs: [
          {
            gemeentenaam: String
            huis_nlt: String
            huisletter: String
            huisnummer: String
            postcode: String
            provincieafkorting: String
            provinciecode: String
            provincienaam: String
            straatnaam: String
            weergavenaam: String
            woonplaatscode: String
            woonplaatsnaam: String
          }
        ]
      }
    }>(
      () =>
        `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=postcode:${postalCode}&fq=huisnummer+${streetNr}`
    )
    const result = data.value?.response?.docs?.[0]
    if (result) {
      formData.value.contact.address.city = result.woonplaatsnaam
      formData.value.contact.address.street = result.straatnaam
      formData.value.contact.address.preview = result.weergavenaam
      foundAddress.value = true
    } else {
      formData.value.contact.address.city = null
      formData.value.contact.address.street = null
      formData.value.contact.address.preview = null
      foundAddress.value = false
    }
    isFetchingAddress.value = false
  }
}
</script>

<template>
  <div>
    <FormKit
      v-model="formData"
      id="participation-form"
      type="form"
      :form-class="{ 'pb-6': true, hidden: isSubmitSuccesfull === true }"
      :actions="false"
      #default="{ disabled }"
      @submit="submitForm"
    >
      <div class="border-b-divider-black mb-6 pb-3">
        <h3 class="mb-3 font-display text-xl font-bold leading-none text-brown-500">
          Met wie kunnen we contact opnemen?
        </h3>
        <FormKit
          name="contact"
          type="group"
        >
          <FormKit
            inner-class="bg-white"
            label="Naam"
            name="name"
            type="text"
            validation="required:trim"
          />
          <FormKit
            inner-class="bg-white"
            label="E-mail"
            name="email"
            type="email"
            validation="required:trim|email"
          />
          <FormKit
            inner-class="bg-white"
            label="Telefoonnummer"
            name="phone"
            type="tel"
            :validation="[
              [
                'matches',
                /^((\+|00(\s|\s?-\s?)?)31(\s|\s?-\s?)?(\(0\)[-\s]?)?|0)[1-9]((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/,
              ],
              ['required:trim'],
            ]"
            :validation-messages="{
              matches: 'Vul een geldig telefoonnummer in.',
            }"
          />
          <FormKit
            name="address"
            type="group"
          >
            <div class="grid grid-cols-3 items-start gap-3">
              <FormKit
                outer-class="col-span-2"
                inner-class="bg-white"
                label="Postcode"
                name="postalCode"
                type="text"
                validation="required:trim"
              />
              <FormKit
                inner-class="bg-white"
                label="Huisnummer"
                name="streetNr"
                type="text"
                validation="required:trim"
              />
              <FormKit
                label="Gevonden adres"
                name="preview"
                type="hidden"
              />
            </div>
            <ul class="formkit-messages -mt-3 mb-0 list-none p-0">
              <li
                v-if="
                  !foundAddress &&
                  !isFetchingAddress &&
                  formData.contact.address.postalCode &&
                  formData.contact.address.streetNr
                "
                class="formkit-message mb-1 text-xs text-red-500"
              >
                Adres niet gevonden. Controleer je postcode en huisnummer.
              </li>
              <li
                v-else-if="foundAddress && !isFetchingAddress"
                class="formkit-message mb-1 text-xs"
              >
                {{ formData.contact.address.preview }}
              </li>
            </ul>
            <div class="grid grid-cols-2">
              <FormKit
                name="street"
                type="hidden"
                validation="required:trim"
                :validation-messages="{
                  required: 'Adres bestaat niet.',
                }"
              />
              <FormKit
                name="city"
                type="hidden"
                validation="required:trim"
                :validation-messages="{
                  required: 'Adres bestaat niet.',
                }"
              />
            </div>
          </FormKit>
        </FormKit>
      </div>
      <div class="border-b-divider-black mb-6 pb-3">
        <h3 class="mb-3 font-display text-xl font-bold leading-none text-brown-500">
          Wie zullen er deelnemen?
        </h3>
        <FormKit
          inner-class="bg-white"
          label="Aantal deelnemers"
          name="amountParticipants"
          step="1"
          min="1"
          type="number"
          value="1"
        />
        <FormKit
          name="participants"
          type="list"
        >
          <FormKit
            v-for="participantNr in Number(formData.amountParticipants)"
            :key="participantNr"
            :name="`${participantNr}`"
            type="group"
          >
            <div class="grid grid-cols-4 gap-3">
              <FormKit
                inner-class="bg-white"
                label="Naam"
                name="name"
                outer-class="col-span-3"
                type="text"
                validation="required:trim"
              />
              <FormKit
                inner-class="bg-white"
                label="Leeftijd"
                name="age"
                step="1"
                type="number"
              />
            </div>
          </FormKit>
        </FormKit>
      </div>
      <div class="mb-6">
        <h3 class="mb-3 font-display text-xl font-bold leading-none text-brown-500">
          Heb je vragen en/of opmerkingen?
        </h3>
        <FormKit
          inner-class="bg-white"
          label-class="sr-only"
          label="Vragen en/of opmerkingen"
          name="comments"
          rows="6"
          type="textarea"
        />
      </div>
      <FormKit
        type="submit"
        label="Aanmelden"
        wrapper-class="border-x-none border-t-none group relative z-10 flex cursor-pointer select-none items-center justify-center border-b-transparent outline-none active:border-b-[4px]"
        :input-class="{
          'font-normal': false,
          'bg-blue-600': false,
          'text-white': false,
          'text-sm': false,
          rounded: false,
          [`relative flex w-full items-center justify-center rounded-3xl before:rounded-3xl after:rounded-3xl text-lg border-b-[4px] border-b-transparent text-center font-bold text-black shadow-[0_0_0_2px_#18181b] before:absolute before:left-0 before:top-[5px] before:-z-10 before:h-full before:w-full before:bg-gray-300 before:content-[''] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:bg-white after:content-[''] group-hover:after:bg-gray-100 group-active:translate-y-[4px] group-active:border-b-0 group-active:before:invisible`]: true,
        }"
      />
    </FormKit>
    <p
      v-if="isSubmitSuccesfull === false"
      class="border-pencil-black mb-6 rounded-lg bg-red-400 px-2 py-1 font-bold text-white"
    >
      Er is iets mis gegaan bij het versturen van je aanmelding. Probeer het nog eens.
    </p>
    <div
      v-if="isSubmitSuccesfull === true"
      class="border-pencil-black mb-6 rounded-lg bg-green-400 px-2 py-1 font-bold text-white"
    >
      <p>
        Dankjewel voor je aanmelding! Je krijgt zo snel mogelijk meer informatie van ons
        en antwoord op eventuele vragen.
      </p>
      <p class="mt-4">
        Let op: als deelname hievoor niet gratis is, wordt je aanmelding pas definitief
        zodra jouw betaling door ons is ontvangen.
      </p>
      <p class="mt-4">Je kunt dit scherm nu sluiten.</p>
    </div>
  </div>
</template>
