<template>
  <AppPage>
    <div class="h-full flex-col" border="1 solid #ccc" dark:bg-dark>
      <WangToolbar
        border-b="1px solid #ccc"
        :editor="editorRef"
        :default-config="toolbarConfig"
        mode="default"
      />
      <WangEditor
        v-model="valueHtml"
        style="flex: 1; overflow-y: hidden"
        :default-config="editorConfig"
        mode="default"
        @on-created="handleCreated"
      />
    </div>
  </AppPage>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { Editor as WangEditor, Toolbar as WangToolbar } from '@wangeditor/editor-for-vue'
import { i18nChangeLanguage } from '@wangeditor/editor'

defineOptions({ name: 'RichTextEditor' })


// Switch language - 'en' or 'zh-CN'
i18nChangeLanguage('en')


const editorRef = shallowRef()
const toolbarConfig = { excludeKeys: 'fullScreen' }
const editorConfig = { placeholder: 'Please enter the content...', MENU_CONF: {} }
const valueHtml = ref('')

const handleCreated = (editor) => {
  editorRef.value = editor
}
</script>

<style>
html.dark {
  --w-e-textarea-bg-color: #333;
  --w-e-textarea-color: #fff;
  --w-e-toolbar-bg-color: #333;
  --w-e-toolbar-color: #fff;
  --w-e-toolbar-active-bg-color: #666;
  --w-e-toolbar-active-color: #fff;
  /* ...others... */
}
</style>
