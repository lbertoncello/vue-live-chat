import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection) => {
  const documents = ref(null)
  const error = ref(null)
  const collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')

  const unsub = collectionRef.onSnapshot((snap) => {
    const results = []
    snap.docs.forEach((doc) => {
      /*
       * The code on the right will only be executed if the value of createdAt is valid.
       * In other words, that will prevent local data from being taken in consideration.
       * This is needed because createdAt will only have a value when it reaches the server.
       */
      doc.data().createdAt && results.push({ id: doc.id, ...doc.data() })
    })
    documents.value = results
    error.value = null
  }, (err) => {
    console.error(err.message)
    documents.value = null
    error.value = 'Could not fetch data'
  })

  /* 
   * onInvalidate runs when the component where watchEffect was called unmounts.
   * In this case, it will happen when the user logs out.
   */
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { error, documents }
}

export default getCollection