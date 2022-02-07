import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection) => {
  const documents = ref(null)
  const error = ref(null)
  const collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')

  collectionRef.onSnapshot((snap) => {
    const results = []
    snap.docs.forEach((doc) => {
      /*
       * The code on the right will only be executed if the value of createdAt is valid.
       * In other words, that will prevent local data from being taken in consideration.
       * This is needed because createdAt will only have a value when it reaches the server.
       */
      doc.data().createdAt && results.push({ id: doc.id, ...doc.data() })
    })
    docs.value = results
    error.value = null
  }, (err) => {
    console.error(err.message)
    documents.value = null
    error.value = 'Could not fetch data'
  })

  return { error, documents }
}

export default getCollection