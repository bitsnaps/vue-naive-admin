<template>
  <CommonPage show-footer>
    <n-space size="large">
      <n-card title="Button Button">
        <n-space>
          <n-button>Default</n-button>
          <n-button type="tertiary">Tertiary</n-button>
          <n-button type="primary">Primary</n-button>
          <n-button type="info">Info</n-button>
          <n-button type="success">Success</n-button>
          <n-button type="warning">Warning</n-button>
          <n-button type="error">Error</n-button>
        </n-space>
      </n-card>

      <n-card title="bring Icon Button">
        <n-space>
          <n-button type="info">
            <TheIcon icon="material-symbols:add" :size="18" class="mr-5" />
            Increase
          </n-button>
          <n-button type="error">
            <TheIcon icon="material-symbols:delete-outline" :size="18" class="mr-5" />
            Delete
          </n-button>
          <n-button type="warning">
            <TheIcon icon="material-symbols:edit-outline" :size="18" class="mr-5" />
            Edit
          </n-button>
          <n-button type="primary">
            <TheIcon icon="majesticons:eye-line" :size="18" class="mr-5" />
            Check
          </n-button>
        </n-space>
      </n-card>
    </n-space>

    <n-space size="large" mt-30>
      <n-card min-w-340 title="notify Notification">
        <n-space>
          <n-button @click="notify('info')">Information</n-button>
          <n-button @click="notify('success')">Success</n-button>
          <n-button @click="notify('warning')">Warn</n-button>
          <n-button @click="notify('error')">Error</n-button>
        </n-space>
      </n-card>

      <n-card min-w-340 title="Confirm the pop -up window Dialog">
        <n-button type="error" @click="handleDelete">
          <icon-mi:delete mr-5 />
          delete
        </n-button>
      </n-card>

      <n-card min-w-340 title="message notification Message">
        <n-button :loading="loading" type="primary" @click="handleLogin">
          <icon-mdi:login v-show="!loading" mr-5 />
          Log in
        </n-button>
      </n-card>
    </n-space>
  </CommonPage>
</template>

<script setup>
const handleDelete = function () {
  $dialog.confirm({
    content: 'Confirm deletion?',
    confirm() {
      $message.success('successfully deleted')
    },
    cancel() {
      $message.warning('Cancelled')
    },
  })
}

const loading = ref(false)
function handleLogin() {
  loading.value = true
  $message.loading('Landing...')
  setTimeout(() => {
    $message.error('Login failed')
    $message.loading('I am trying to log in again...')
    setTimeout(() => {
      $message.success('Landed successfully')
      loading.value = false
    }, 2000)
  }, 2000)
}

function notify(type) {
  $notification[type]({
    content: 'What do you say',
    meta: 'Have no idea',
    duration: 2500,
    keepAliveOnHover: true,
  })
}
</script>
