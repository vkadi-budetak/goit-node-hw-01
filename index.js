// index.js
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const argv = require("yargs").argv;

// TODO: рефакторити
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      (async () => {
        const contacts = await listContacts();
        console.table(contacts);
      })();
      break;

    case "get":
      (async () => {
        const contact = await getContactById(id);
        console.table(contact);
      })();
      break;

    case "add":
      (async () => {
        const newContact = await addContact(name, email, phone);
        console.table(newContact);
      })();
      break;

    case "remove":
      (async () => {
        const removedContact = await removeContact(id);
        console.table(removedContact);
      })();
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
