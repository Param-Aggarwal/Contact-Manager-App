import React from "react";
import styles from "./ContactList.module.css";
import type { Contact } from "../../store/contactsSlice";
import ContactItem from "../ContactItem/ContactItem";

interface ContactListProps {
  contacts: Contact[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedIds,
  onToggleSelect,
  onEdit,
  onDelete,
}) => {
  if (contacts.length === 0) {
    return <div className={styles.empty}>No contacts found.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.checkboxCol}></th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Address</th>
            <th className={styles.actionsCol}>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              checked={selectedIds.includes(contact.id)}
              onToggleSelect={onToggleSelect}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
