<template>
  <CommonPage show-footer>
    <div w-350>
      <n-input placeholder="Please enter a value" v-model:value="inputVal" />
      <n-input-number v-model:value="number" mt-30 />
      <p mt-20 text-center text-14 color-gray>Note: Right -click the label and reload it to reset Keep-alive</p>
    </div>
  </CommonPage>
</template>

<script setup>
defineOptions({ name: 'KeepAlive' })

const inputVal = ref('')
const number = ref(0)

onMounted(() => {
  $message.success('onMounted')
})

onUnmounted(() => {
  $message.error('onUnmounted')
})

onActivated(() => {
  $message.info('onActivated')
})
onDeactivated(() => {
  $message.warning('onDeactivated')
})
</script>
