<template>
  <QueryBar v-if="$slots.queryBar" mb-30 @search="handleSearch" @reset="handleReset">
    <slot name="queryBar" />
  </QueryBar>

  <n-data-table
    :remote="remote"
    :loading="loading"
    :scroll-x="scrollX"
    :columns="columns"
    :data="tableData"
    :row-key="(row) => row[rowKey]"
    :pagination="isPagination ? pagination : false"
    @update:checked-row-keys="onChecked"
    @update:page="onPageChange"
  />
</template>

<script setup>
import { utils, writeFile } from 'xlsx'

const props = defineProps({
  /**
   * @remote true: Back -end pagination  false： Front -end paging
   */
  remote: {
    type: Boolean,
    default: true,
  },
  /**
   * @remote Whether to pages
   */
  isPagination: {
    type: Boolean,
    default: true,
  },
  scrollX: {
    type: Number,
    default: 1200,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  columns: {
    type: Array,
    required: true,
  },
  /** Parameters in querybar */
  queryItems: {
    type: Object,
    default() {
      return {}
    },
  },
  /** Supplementary parameters (optional) */
  extraParams: {
    type: Object,
    default() {
      return {}
    },
  },
  /**
   * ! The agreed interface is entered into the existing ginseng
   * * The paging mode needs to be agreed on the pages interface to enter the parameters
   *    @pageSize Pagling parameters: How many are displayed in one page, default 10
   *    @pageNo   Pagling parameter: page number, default 1
   * * Need to make an interface out of the parameter
   *    @pageData The paging mode must, the non -paging mode does not have a layer of data if there is no pagedata
   *    @total    The paging mode must be, the non -paging mode does not take a layer of Data.Length if there is no TOTAL
   */
  getData: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['update:queryItems', 'onChecked', 'onDataChange'])
const loading = ref(false)
const initQuery = { ...props.queryItems }
const tableData = ref([])
const pagination = reactive({ page: 1, pageSize: 10 })

async function handleQuery() {
  try {
    loading.value = true
    let paginationParams = {}
    // If the non -paging mode or the front -end pages are used, there is no need to pass the pages parameters
    if (props.isPagination && props.remote) {
      paginationParams = { pageNo: pagination.page, pageSize: pagination.pageSize }
    }
    const { data } = await props.getData({
      ...props.queryItems,
      ...props.extraParams,
      ...paginationParams,
    })
    tableData.value = data?.pageData || data
    pagination.itemCount = data.total ?? data.length
  } catch (error) {
    tableData.value = []
    pagination.itemCount = 0
  } finally {
    emit('onDataChange', tableData.value)
    loading.value = false
  }
}
function handleSearch() {
  pagination.page = 1
  handleQuery()
}
async function handleReset() {
  const queryItems = { ...props.queryItems }
  for (const key in queryItems) {
    queryItems[key] = ''
  }
  emit('update:queryItems', { ...queryItems, ...initQuery })
  await nextTick()
  pagination.page = 1
  handleQuery()
}
function onPageChange(currentPage) {
  pagination.page = currentPage
  if (props.remote) {
    handleQuery()
  }
}
function onChecked(rowKeys) {
  if (props.columns.some((item) => item.type === 'selection')) {
    emit('onChecked', rowKeys)
  }
}
function handleExport(columns = props.columns, data = tableData.value) {
  if (!data?.length) return $message.warning('No data')
  const columnsData = columns.filter((item) => !!item.title && !item.hideInExcel)
  const thKeys = columnsData.map((item) => item.key)
  const thData = columnsData.map((item) => item.title)
  const trData = data.map((item) => thKeys.map((key) => item[key]))
  const sheet = utils.aoa_to_sheet([thData, ...trData])
  const workBook = utils.book_new()
  utils.book_append_sheet(workBook, sheet, 'Data Report')
  writeFile(workBook, 'data_report.xlsx')
}

defineExpose({
  handleSearch,
  handleReset,
  handleExport,
})
</script>
