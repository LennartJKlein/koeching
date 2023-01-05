<script lang="ts" setup>
import { onMounted, ref, watchEffect, useAttrs } from "vue";
const props = defineProps({
  open: Boolean,
});

const dialog = ref<InstanceType<any> | undefined>(null);
const isOpen = ref(false);
const isClosing = ref(false);
const attrs = useAttrs();

function throttle<T>(fn: T, wait: number) {
  let throttled = false;
  return (event: Event) => {
    if (typeof fn === "function") {
      if (!throttled) {
        fn(event);
        throttled = true;
        setTimeout(() => {
          throttled = false;
        }, wait);
      }
    }
  };
}

function showModal() {
  if (!dialog?.value) return;
  dialog.value.showModal();
}

function hideModal() {
  if (!dialog?.value) return;
  // After disappearing
  dialog.value.addEventListener("webkitTransitionEnd", () => {
    dialog.value.removeEventListener("webkitTransitionEnd", () => {});
    dialog.value.close();
    isClosing.value = false;
  });

  // Start closing animation
  isClosing.value = true;
}

const isDragging = ref(false);
const dragYStart = ref(0);
const dragYOffset = ref(0);

function dragStart(e: TouchEvent | MouseEvent) {
  if (isDragging.value) return;
  isDragging.value = true;
  if (e instanceof TouchEvent) {
    dragYStart.value = e.changedTouches[0].screenY;
  }
  if (e instanceof MouseEvent) {
    dragYStart.value = e.screenY;
  }
}

function dragMove(e: TouchEvent | MouseEvent) {
  if (!isDragging.value || dragYStart.value == 0) return;
  let movement = 0;
  if (e instanceof TouchEvent) {
    movement = e.changedTouches[0].screenY;
  }
  if (e instanceof MouseEvent) {
    movement = e.screenY;
  }
  dragYOffset.value =
    movement > dragYStart.value ? movement * 1.05 - dragYStart.value : 0;
}

function dragEnd(e: TouchEvent | MouseEvent) {
  if (!isDragging.value || dragYStart.value == 0) return;
  let movement = 0;
  if (e instanceof TouchEvent) {
    movement = e.changedTouches[0].screenY;
  }
  if (e instanceof MouseEvent) {
    movement = e.screenY;
  }
  const diff = movement - dragYStart.value;
  if (Math.abs(diff) > window.screen.height * 0.4) {
    // Close if dragged down far enough
    hideModal();
  }
  dragYStart.value = 0;
  dragYOffset.value = 0;
  isDragging.value = false;
}

onMounted(() => {
  watchEffect(() => {
    if (props.open !== isOpen.value) {
      props.open ? showModal() : hideModal();
      isOpen.value = props.open;
    }
  });
});
</script>

<template>
  <dialog
    :class="[
      'top-0 left-0 right-0 m-0 h-full max-h-screen min-w-full max-w-none overflow-y-auto overflow-x-hidden bg-transparent p-0 duration-[350ms] ease-out backdrop:bg-white backdrop:bg-opacity-40 backdrop:backdrop-blur-sm backdrop:transition-all backdrop:duration-700',
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
    @click="hideModal"
    @mousemove="throttle(dragMove($event), 100)"
    @mouseup="dragEnd"
    @touchend="dragEnd"
    @touchmove="throttle(dragMove($event), 100)"
  >
    <Button
      wide
      @click="hideModal"
      class="sr-only mx-auto"
      label="Sluit het detailscherm"
      color="black"
      outlined
      >sluiten</Button
    >
    <div
      class="mx-auto mt-[10vh] min-h-[90vh] w-full max-w-2xl rounded-t-3xl border-2 border-b-0 border-black bg-white px-5 pb-6"
      @click.stop
    >
      <button
        class="mx-auto mb-3 w-full cursor-grab touch-none active:cursor-grabbing"
        @mousedown="dragStart"
        @touchstart="dragStart"
        tabindex="-1"
        aria-hidden="true"
      >
        <Icon id="drag-indicator" size="4" class="fill-gray-500" />
        <span class="sr-only">Sluit het detailscherm</span>
      </button>
      <slot />
      <Button
        wide
        @click="hideModal"
        class="mx-auto mt-6"
        label="Sluit het detailscherm"
        color="black"
        outlined
        >sluiten</Button
      >
    </div>
  </dialog>
</template>
