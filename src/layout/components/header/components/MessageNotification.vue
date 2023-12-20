<template>
  <n-popover trigger="click" placement="bottom" @update:show="handlePopoverShow">
    <template #trigger>
      <n-badge :value="count" mr-20 cursor-pointer>
        <n-icon size="18" color-black dark="color-hex-fff">
          <icon-material-symbols:notifications-outline />
        </n-icon>
      </n-badge>
    </template>
    <n-tabs v-model:value="activeTab" type="line" justify-content="space-around" animated>
      <n-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        :tab="tab.title + `(${tab.messages.length})`"
      >
        <ul class="cus-scroll-y max-h-200 w-220">
          <li
            v-for="(item, index) in tab.messages"
            :key="index"
            class="flex-col py-12"
            border-t="1 solid gray-200"
            :style="index > 0 ? '' : 'border: none;'"
          >
            <span mb-4 text-ellipsis>{{ item.content }}</span>
            <span text-hex-bbb>{{ item.time }}</span>
          </li>
        </ul>
      </n-tab-pane>
    </n-tabs>
  </n-popover>
</template>

<script setup>
import { formatDateTime } from '@/utils'

const activeTab = ref('')
const tabs = [
  {
    name: 'zan',
    title: 'Like',
    messages: [
      { content: 'Your article "XX" received a likes', time: formatDateTime() },
      { content: 'Your article "YY" received a likes', time: formatDateTime() },
      { content: 'Your article "AA" received a likes', time: formatDateTime() },
      { content: 'Your article "BB" received a likes', time: formatDateTime() },
      { content: 'Your article "CC" received a likes', time: formatDateTime() },
      { content: 'Your article "DD" received a likes', time: formatDateTime() },
    ],
  },
  {
    name: 'star',
    title: 'Focus on',
    messages: [
      { content: 'Zhang San Follow you', time: formatDateTime() },
      { content: 'King five Follow you', time: formatDateTime() },
    ],
  },
  {
    name: 'comment',
    title: 'Comment',
    messages: [
      { content: 'Zhang San Comment on your article "XX""learned"', time: formatDateTime() },
      { content: 'Li Comment on your article "YY"YY》"Not as good as Vue"', time: formatDateTime() },
    ],
  },
]
const count = ref(tabs.map((item) => item.messages).flat().length)

watch(activeTab, (v) => {
  if (count === 0) return
  const tabIndex = tabs.findIndex((item) => item.name === v)
  count.value -= tabs[tabIndex].messages.length
  if (count.value < 0) count.value = 0
})

function handlePopoverShow(show) {
  if (show && !activeTab.value) {
    activeTab.value = tabs[0]?.name
  }
}
</script>
