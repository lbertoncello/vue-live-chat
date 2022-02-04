<template>
  <nav>
    <div>
      <p>Hey there... display name here</p>
      <p class="email">Current logged in as... email</p>
    </div>
    <button @click="handleClick">Logout</button>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import useLogout from '../composables/useLogout'

export default {
  setup() {
    const router = useRouter()
    const { error, logout } = useLogout()

    const handleClick = async () => {
      await logout()
      if (!error.value) {
        router.push({ name: 'Welcome' })
      }
    }

    return { handleClick }
  }
}
</script>

<style>
  nav {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
</style>