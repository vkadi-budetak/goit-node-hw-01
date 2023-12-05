const { 
  v1: uuidv1
} = require('uuid');

const fs = require("fs").promises;
const { readFile } = require("fs");
const path = require("path");


const contactsPath = path.resolve("db/contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(readResult)

    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const allContacts = await listContacts()
  const index = allContacts.findIndex((el) => el.id === contactId)
  if(index >= 0) {
    return allContacts[index]
  } else {
    return null
  }
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const allContacts = await listContacts()
  const deletedContact = await getContactById(contactId)
  if (deletedContact) {
    const filteredContacts = allContacts.filter((el) => el.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts))

    return deletedContact
  } else {
    return null
  }
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const allContacts = await listContacts()
  const newContact = {
    id: uuidv1(),
    name: name,
    email: email,
    phone: phone,
  }
  await fs.writeFile(contactsPath, JSON.stringify([...allContacts, newContact]))
  return newContact
}


// (async () => {
//   console.log(await addContact('Vlad', 'ww@ukr.net', '888888888888'))
// })()

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}