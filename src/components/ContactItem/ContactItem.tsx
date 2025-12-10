import React from "react";
import styles from "./ContactItem.module.css";
import type { Contact } from "../../store/contactsSlice";
import editIcon from "../../edit-icon.png";
import deleteIcon from "../../delete-icon.png";

interface ContactItemProps {
  contact: Contact;
  checked: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  checked,
  onToggleSelect,
  onEdit,
  onDelete,
}) => {
  const fullAddress = [
    contact.addressLine1,
    contact.addressLine2,
    contact.state,
    contact.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggleSelect(contact.id)}
        />
      </td>
      <td className={styles.name}>{contact.name}</td>
      <td className={styles.contact}>{contact.contactNo}</td>
      <td>{contact.email}</td>
      <td>{fullAddress}</td>
      <td>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => onEdit(contact)}
          >
            <img src={editIcon} alt="Edit" className={styles.icon} />
            <span className={styles.iconLabel}>Edit</span>
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => onDelete(contact.id)}
          >
            <img src={deleteIcon} alt="Delete" className={styles.icon} />
            <span className={styles.iconLabel}>Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ContactItem;
