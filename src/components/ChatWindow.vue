<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="formattedDocuments" class="messages" ref="messages">
      <div v-for="document in formattedDocuments" :key="document.id" class="singleDocument">
        <span class="created-at">{{ document.createdAt }}</span>
        <span class="name">{{ document.name }}</span>
        <span class="message">{{ document.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onUpdated } from 'vue'
import getCollection from '../composables/getCollection'
import { formatDistanceToNow } from 'date-fns'

export default {
  setup() {
    const { error, documents } = getCollection('messages')

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((document) => {
          const time = formatDistanceToNow(document.createdAt.toDate())

          return { ...document, createdAt: time }
        })
      }
    })

    // Auto-scroll to bottom of messages
    const messages = ref(null)

    onUpdated(() => {
      messages.value.scrollTo({ top: messages.value.scrollHeight, behavior: 'smooth' })
    })

    return { error, documents, formattedDocuments, messages }
  }
}
</script>

<style>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .singleDocument {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }
</style>