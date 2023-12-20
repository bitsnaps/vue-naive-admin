<template>
  <CommonPage show-footer title="Article">
    <template #action>
      <div>
        <n-button type="primary" secondary @click="$table?.handleExport()">
          <TheIcon icon="mdi:download" :size="18" class="mr-5" />
          Export
        </n-button>
        <n-button type="primary" class="ml-16" @click="handleAdd">
          <TheIcon icon="material-symbols:add" :size="18" class="mr-5" />
          New article
        </n-button>
      </div>
    </template>

    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :extra-params="extraParams"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getPosts"
      @on-checked="onChecked"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem label="Title" :label-width="50">
          <n-input
            v-model:value="queryItems.title"
            type="text"
            placeholder="Please enter the title"
            @keypress.enter="$table?.handleSearch"
          />
        </QueryBarItem>
      </template>
    </CrudTable>
    <!-- New/Edit/View-->
    <CrudModal
      v-model:visible="modalVisible"
      :title="modalTitle"
      :loading="modalLoading"
      :show-footer="modalAction !== 'view'"
      @on-save="handleSave"
    >
      <n-form
        ref="modalFormRef"
        label-placement="left"
        label-align="left"
        :label-width="80"
        :model="modalForm"
        :disabled="modalAction === 'view'"
      >
        <n-form-item label="author" path="author">
          <n-input v-model:value="modalForm.author" disabled />
        </n-form-item>
        <n-form-item
          label="Article title"
          path="title"
          :rule="{
            required: true,
            message: 'Please enter the article title',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.title" placeholder="Please enter the article title" />
        </n-form-item>
        <n-form-item
          label="Article content"
          path="content"
          :rule="{
            required: true,
            message: 'Please enter the article content',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input
            v-model:value="modalForm.content"
            placeholder="Please enter the article content"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item>
      </n-form>
    </CrudModal>
  </CommonPage>
</template>

<script setup>
import { NButton, NSwitch } from 'naive-ui'
import { formatDateTime, renderIcon, isNullOrUndef } from '@/utils'
import { useCRUD } from '@/composables'
import api from './api'

defineOptions({ name: 'Crud' })

const $table = ref(null)
/** Table data, this value will be updated when searching for search */
const tableData = ref([])
/** QueryBar screening parameters (optional) */
const queryItems = ref({})
/** Supplementary parameters (optional) */
const extraParams = ref({})

onActivated(() => {
  $table.value?.handleSearch()
})

const columns = [
  { type: 'selection', fixed: 'left' },
  {
    title: 'Release',
    key: 'isPublish',
    width: 60,
    align: 'center',
    fixed: 'left',
    render(row) {
      return h(NSwitch, {
        size: 'small',
        rubberBand: false,
        value: row['isPublish'],
        loading: !!row.publishing,
        onUpdateValue: () => handlePublish(row),
      })
    },
  },
  { title: 'Title', key: 'title', width: 150, ellipsis: { tooltip: true } },
  { title: 'Classification', key: 'category', width: 80, ellipsis: { tooltip: true } },
  { title: 'Founder', key: 'author', width: 80 },
  {
    title: 'Creation time',
    key: 'createDate',
    width: 150,
    render(row) {
      return h('span', formatDateTime(row['createDate']))
    },
  },
  {
    title: 'Last update time',
    key: 'updateDate',
    width: 150,
    render(row) {
      return h('span', formatDateTime(row['updateDate']))
    },
  },
  {
    title: 'Operate',
    key: 'actions',
    width: 240,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => handleView(row),
          },
          { default: () => 'View', icon: renderIcon('majesticons:eye-line', { size: 14 }) }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => handleEdit(row),
          },
          { default: () => 'Edit', icon: renderIcon('material-symbols:edit-outline', { size: 14 }) }
        ),

        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 15px;',
            onClick: () => handleDelete(row.id),
          },
          {
            default: () => 'Delete',
            icon: renderIcon('material-symbols:delete-outline', { size: 14 }),
          }
        ),
      ]
    },
  },
]

// Chose event
function onChecked(rowKeys) {
  if (rowKeys.length) $message.info(`Select ${rowKeys.join(' ')}`)
}

// release
function handlePublish(row) {
  if (isNullOrUndef(row.id)) return

  row.publishing = true
  setTimeout(() => {
    row.isPublish = !row.isPublish
    row.publishing = false
    $message?.success(row.isPublish ? 'Published' : 'Cancelled release')
  }, 1000)
}

const {
  modalVisible,
  modalAction,
  modalTitle,
  modalLoading,
  handleAdd,
  handleDelete,
  handleEdit,
  handleView,
  handleSave,
  modalForm,
  modalFormRef,
} = useCRUD({
  name: 'Article',
  initForm: { author: 'Big face' },
  doCreate: api.addPost,
  doDelete: api.deletePost,
  doUpdate: api.updatePost,
  refresh: () => $table.value?.handleSearch(),
})
</script>
