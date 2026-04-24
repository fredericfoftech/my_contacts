<template>
  <div class="signup-container">
    <div class="signup-form">
      <div class="header-actions">
        <button class="logout-btn" @click="logout">Se déconnecter</button>
      </div>

      <h2>Mon Profil</h2>
    
      <div class="form-group">
        <input type="text" v-model="newContact.firstname" placeholder="Prénom" required />
        <input type="text" v-model="newContact.lastname" placeholder="Nom" required />
         <input type="tel" v-model="newContact.phone" placeholder="Téléphone" required />
        <input type="email" v-model="newContact.email" placeholder="Email" required />
         <select v-model="newContact.gender">
          <option value="M">Homme</option>
          <option value="F">Femme</option>
        </select>
         <input type="date" v-model="newContact.birthdate" />
        <input type="text" v-model="newContact.position" placeholder="Poste" />
        <input type="text" v-model="newContact.company" placeholder="Entreprise" />
        
        <button class="submit-btn" @click="addContact">Ajouter le contact</button>
      </div>

      <div v-if="contacts.length">
        <div v-for="contact in contacts" :key="contact.id" class="contact-card">
          <div v-if="editId !== contact.id">
            <p><strong>{{ contact.firstname }} {{ contact.lastname }}</strong></p>
            <p>{{ contact.email }} | {{ contact.phone }}</p>
            <p><small>{{ contact.position }} chez {{ contact.company }}</small></p>
            <button class="edit-btn" @click="startEdit(contact)">Modifier</button>
            <button class="delete-btn" @click="deleteContact(contact.id)">Supprimer</button>
          </div>

          <div v-else class="edit-mode">
            <input v-model="editContact.firstname" placeholder="Prénom" />
            <input v-model="editContact.lastname" placeholder="Nom" />
              <input v-model="editContact.phone" placeholder="Téléphone" />
            <input v-model="editContact.email" placeholder="Email" />
             <select v-model="editContact.gender">
              <option value="M">Homme</option>
              <option value="F">Femme</option>
            </select>
            <input v-model="editContact.birthdate" type="date" />
            <input v-model="editContact.position" placeholder="Poste" />
            <input v-model="editContact.company" placeholder="Entreprise" />
          
            <div class="edit-buttons">
              <button class="save-btn" @click="updateContact">Valider</button>
              <button class="cancel-btn" @click="cancelEdit">Annuler</button>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="no-contact">Aucun contact trouvé</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAccount } from '@/stores/api'

const store = useAccount()
const router = useRouter()
const contacts = ref<any[]>([])

const getToken = () => localStorage.getItem('token')

const newContact = ref({
  firstname: '', lastname: '', phone: '', email: '',
  gender: '', birthdate: '', position: '', company: ''
})

const editId = ref(null)
const editContact = ref<any>({})

onMounted(async () => {
  if (!getToken()) {
    router.push('/')
    return
  }
  await fetchContacts()
})

const fetchContacts = async () => {
  const token = getToken()
  if (!token) return
  try {
    contacts.value = await store.getAllContacts(token)
  } catch (e) {
    console.error(e)
  }
}

const addContact = async () => {
  const token = getToken()
  if (!newContact.value.firstname || !newContact.value.lastname || !newContact.value.email || !newContact.value.phone || !token) {
    alert('Veuillez remplir les champs obligatoires (Prénom, Nom, Email, Tel)')
    return
  }

  try {
    await store.createContact(
      token, 
      newContact.value.firstname, 
      newContact.value.lastname, 
      newContact.value.phone, 
      newContact.value.email, 
      newContact.value.gender, 
      newContact.value.birthdate, 
      newContact.value.position, 
      newContact.value.company
    )
    
    newContact.value = { firstname: '', lastname: '', phone: '', email: '', gender: 'M', birthdate: '', position: '', company: '' }
    await fetchContacts()
  } catch (e) {
    alert('Erreur lors de la création')
  }
}

const deleteContact = async (id: string) => {
  const token = getToken()
  if (!token || !confirm('Supprimer ce contact ?')) return
  try {
    await store.deleteContact(token, id)
    await fetchContacts()
  } catch (e) {
    alert('Erreur suppression')
  }
}

const startEdit = (contact: any) => {
  editId.value = contact.id
  editContact.value = { ...contact }
}

const cancelEdit = () => { editId.value = null }

const updateContact = async () => {
  const token = getToken()
  if (!token) return
  try {
    await store.updateContact(
      token, 
      editContact.value.id, 
      editContact.value.firstname, 
      editContact.value.lastname, 
      editContact.value.phone, 
      editContact.value.email,
      editContact.value.gender, 
      editContact.value.birthdate,
      editContact.value.position, 
      editContact.value.company
    )
    editId.value = null
    await fetchContacts()
  } catch (e) {
    alert('Erreur modification')
  }
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/connexion')
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #f4f7f6;
  font-family: sans-serif;
}

.signup-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px;
}

.header-actions {
  display: flex;
  justify-content: flex-end;
}

.logout-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
}

h2 { text-align: center; color: #333; }

.form-group input, .form-group select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.contact-card {
  background: #fff;
  border: 1px solid #eee;
  padding: 15px;
  margin-top: 15px;
  border-radius: 8px;
}

.edit-mode input, .edit-mode select {
  width: 100%;
  margin-bottom: 5px;
  padding: 5px;
}

.edit-buttons { display: flex; gap: 10px; margin-top: 10px; }

.edit-btn { background: #2196F3; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin-right: 5px; cursor: pointer;}
.delete-btn { background: #f44336; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;}
.save-btn { background: #4CAF50; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;}
.cancel-btn { background: #9e9e9e; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;}

.no-contact { text-align: center; color: #999; margin-top: 20px; }
</style>
