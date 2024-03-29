<script lang="ts" setup>
import { onMounted, ref, watchEffect, useAttrs } from 'vue'
import { throttle } from 'lodash-es'
const props = defineProps({
  open: Boolean,
  overflowHeader: Boolean,
  narrow: Boolean,
  bgClasses: String,
  headingClasses: String,
  draggableClasses: String,
})

const dialog = ref<InstanceType<any> | undefined>(null)
const isOpen = ref(false)
const isClosing = ref(false)
const attrs = useAttrs()

function showModal() {
  if (!dialog?.value) return
  dialog.value.showModal()
}

function hideModal() {
  if (!dialog?.value) return
  // After disappearing
  dialog.value.addEventListener('webkitTransitionEnd', () => {
    dialog.value.removeEventListener('webkitTransitionEnd', () => {})
    dialog.value.close()
    isClosing.value = false
  })

  // Start closing animation
  isClosing.value = true
}

const isDragging = ref(false)
const isInteractionInModal = ref(false)
const dragYStart = ref(0)
const dragYOffset = ref(0)

function dragStart(e: TouchEvent | MouseEvent) {
  if (isDragging.value) return
  isDragging.value = true
  if (e instanceof TouchEvent) {
    dragYStart.value = e.changedTouches[0].screenY
  }
  if (e instanceof MouseEvent) {
    dragYStart.value = e.screenY
  }
}

const dragMove = throttle((e: TouchEvent | MouseEvent) => {
  if (!isDragging.value || dragYStart.value == 0) return
  let movement = 0
  if (e instanceof TouchEvent) {
    movement = e.changedTouches[0].screenY
  }
  if (e instanceof MouseEvent) {
    movement = e.screenY
  }
  dragYOffset.value = movement > dragYStart.value ? movement - dragYStart.value : 0
}, 50)

function dragEnd(e: TouchEvent | MouseEvent) {
  if (!isDragging.value || dragYStart.value == 0) return
  let movement = 0
  if (e instanceof TouchEvent) {
    movement = e.changedTouches[0].screenY
  }
  if (e instanceof MouseEvent) {
    movement = e.screenY
  }
  const diff = movement - dragYStart.value
  if (Math.abs(diff) > window.screen.height * 0.4) {
    // Close if dragged down far enough
    hideModal()
  }
  dragYStart.value = 0
  dragYOffset.value = 0
  isDragging.value = false
}
function clickAnywhere(e: TouchEvent | MouseEvent) {
  if (!isInteractionInModal.value) {
    hideModal()
  }
  isInteractionInModal.value = false
}

onMounted(() => {
  watchEffect(() => {
    if (props.open !== isOpen.value) {
      setTimeout(() => {
        props.open ? showModal() : hideModal()
        isOpen.value = props.open
      }, 350) // wait for page transition animation to have ended
    }
  })
})
</script>

<template>
  <dialog
    :class="[
      'left-0 right-0 top-0 m-0 h-full max-h-screen min-w-full max-w-none overflow-y-auto overflow-x-hidden bg-transparent p-0 duration-[350ms] ease-out backdrop:bg-white backdrop:bg-opacity-40 backdrop:backdrop-blur-sm backdrop:transition-all backdrop:duration-700',
      !isOpen && 'backdrop:bg-opacity-0 backdrop:backdrop-blur-none',
      !isDragging && 'transition-transform',
      isClosing
        ? 'translate-y-full ease-in backdrop:bg-opacity-0 backdrop:backdrop-blur-none'
        : 'ease-out',
    ]"
    :style="`transform: translateY(${
      isClosing ? '100%' : !isOpen ? '100%' : dragYOffset + 'px'
    })`"
    ref="dialog"
    v-bind="attrs"
    @click="clickAnywhere"
    @mousemove="dragMove($event)"
    @mouseup="dragEnd"
    @touchend="dragEnd"
    @touchmove="dragMove($event)"
  >
    <Button
      wide
      @click="hideModal"
      class="sr-only mx-auto"
      label="Sluit het detailscherm"
      color="black"
      outlined
      >scherm sluiten</Button
    >
    <div
      :class="[
        'mx-auto mt-[10vh] flex min-h-[90vh] w-full flex-col items-stretch justify-start overflow-hidden rounded-t-3xl border-2 border-b-0 border-black px-5',
        narrow ? 'max-w-md' : 'max-w-2xl',
        bgClasses || 'bg-white',
      ]"
      @mousedown="isInteractionInModal = true"
      @touchstart="isInteractionInModal = true"
      @click.stop
    >
      <header
        :class="[
          '-mx-5  px-5',
          overflowHeader ? '-mb-32 pb-32' : 'mb-6 pb-6',
          headingClasses || 'bg-sky-100',
        ]"
      >
        <button
          class="mx-auto mb-6 w-full cursor-grab touch-none active:cursor-grabbing"
          @mousedown="dragStart"
          @touchstart="dragStart"
          tabindex="-1"
          aria-hidden="true"
        >
          <Icon
            id="drag-indicator"
            size="4"
            :class="draggableClasses || 'fill-sky-400'"
          />
          <Icon
            id="drag-indicator"
            size="4"
            :class="['ml-[3px]', draggableClasses || 'fill-sky-400']"
          />
          <span class="sr-only">Sluit het detailscherm</span>
        </button>
        <slot name="heading" />
      </header>
      <slot />
      <div class="-mx-5 mt-auto bg-gray-100 py-6">
        <Button
          wide
          @click="hideModal"
          class="mx-auto"
          label="Sluit het detailscherm"
          color="white"
          small
          squared
          outlined
        >
          scherm sluiten
        </Button>
      </div>
    </div>
  </dialog>
</template>
