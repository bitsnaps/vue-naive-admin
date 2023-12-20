<template>
  <CommonPage>
    <n-upload
      class="mx-auto w-[75%] p-20 text-center"
      :custom-request="handleUpload"
      :show-file-list="false"
      accept=".png,.jpg,.jpeg"
      @before-upload="onBeforeUpload"
    >
      <n-upload-dragger>
        <div class="h-150 f-c-c flex-col">
          <TheIcon icon="mdi:upload" :size="68" class="mb-12 c-primary" />
          <n-text class="text-14 c-gray">Click or drag file to the area to upload</n-text>
        </div>
      </n-upload-dragger>
    </n-upload>

    <n-card v-if="imgList && imgList.length" class="mt-16 items-center">
      <n-image-group>
        <n-space justify="space-between" align="center">
          <n-card v-for="(item, index) in imgList" :key="index" class="w-280 hover:card-shadow">
            <div class="h-160 f-c-c">
              <n-image width="200" :src="item.url" />
            </div>
            <n-space class="mt-16" justify="space-evenly">
              <n-button dashed type="primary" @click="copy(item.url)">url</n-button>
              <n-button dashed type="primary" @click="copy(`![${item.fileName}](${item.url})`)">
                MD
              </n-button>
              <n-button
                dashed
                type="primary"
                @click="copy(`&lt;img src=&quot;${item.url}&quot; /&gt;`)"
              >
                img
              </n-button>
            </n-space>
          </n-card>
          <div v-for="i in 4" :key="i" class="w-280" />
        </n-space>
      </n-image-group>
    </n-card>
  </CommonPage>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
defineOptions({ name: 'Upload' })

const { copy, copied } = useClipboard()

const imgList = reactive([
  { url: 'https://cdn.isme.top/images/5c23d52f880511ebb6edd017c2d2eca2.jpg' },
  { url: 'https://cdn.isme.top/images/5c23d52f880511ebb6edd017c2d2eca2.jpg' },
  { url: 'https://cdn.isme.top/images/5c23d52f880511ebb6edd017c2d2eca2.jpg' },
  { url: 'https://cdn.isme.top/images/5c23d52f880511ebb6edd017c2d2eca2.jpg' },
])

watch(copied, (val) => {
  val && $message.success('Copy to the shear plate')
})

function onBeforeUpload({ file }) {
  if (!file.file?.type.startsWith('image/')) {
    $message.error('Can only upload pictures')
    return false
  }
  return true
}

async function handleUpload({ file, onFinish }) {
  if (!file || !file.type) {
    $message.error('Please select the file')
  }

  // Simulation upload
  $message.loading('Uploading...')
  setTimeout(() => {
    $message.success('Successfully upload')
    imgList.push({ fileName: file.name, url: URL.createObjectURL(file.file) })
    onFinish()
  }, 1500)
}
</script>
