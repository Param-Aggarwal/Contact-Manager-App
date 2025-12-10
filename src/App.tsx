import React, { useMemo, useState } from "react";
import Layout from "./components/Layout/Layout";
import SearchBar from "./components/SearchBar/SearchBar";
import Button from "./components/Button/Button";
import ContactList from "./components/ContactList/ContactList";
import AddContactModal from "./components/AddContactModal/AddContactModal";
import ConfirmDialog from "./components/ConfirmDialog/ConfirmDialog";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import type { RootState } from "./store/store";
import {
  addContact,
  clearSelection,
  removeContacts,
  toggleSelect,
  updateContact,
} from "./store/contactsSlice";
import type { Contact } from "./store/contactsSlice";
import styles from "./App.module.css";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state: RootState) => state.contacts.items);
  const selectedIds = useAppSelector(
    (state: RootState) => state.contacts.selectedIds
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<string[]>([]);

  const filteredContacts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return contacts;
    return contacts.filter((c) => {
      return (
        c.name.toLowerCase().includes(term) ||
        (c.contactNo && c.contactNo.toLowerCase().includes(term)) ||
        c.email.toLowerCase().includes(term) ||
        c.state.toLowerCase().includes(term)
      );
    });
  }, [contacts, searchTerm]);

  const openAddModal = () => {
    setModalMode("add");
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const openEditModal = (contact: Contact) => {
    setModalMode("edit");
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleSubmitModal = (data: {
    name: string;
    email: string;
    contactNo?: string;
    addressLine1: string;
    addressLine2?: string;
    pincode: string;
    state: string;
  }) => {
    if (modalMode === "edit" && editingContact) {
      dispatch(
        updateContact({
          id: editingContact.id,
          changes: data,
        })
      );
    } else {
      dispatch(addContact(data));
    }
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const openSingleDelete = (id: string) => {
    setPendingDeleteIds([id]);
    setIsConfirmOpen(true);
  };

  const openBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setPendingDeleteIds(selectedIds);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteIds.length === 0) {
      setIsConfirmOpen(false);
      return;
    }
    dispatch(removeContacts(pendingDeleteIds));
    dispatch(clearSelection());
    setPendingDeleteIds([]);
    setIsConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setPendingDeleteIds([]);
  };

  const handleToggleSelect = (id: string) => {
    dispatch(toggleSelect(id));
  };

  const hasSelection = selectedIds.length > 0;

  return (
    <Layout>
      <h1 className={styles.pageTitle}>Contact Manager</h1>

      <section className={styles.panel}>
        <div className={styles.controlsRow}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <div className={styles.buttonGroup}>
            {hasSelection && (
              <Button variant="primary" onClick={openBulkDelete}>
                Delete ({selectedIds.length})
              </Button>
            )}
            <Button variant="primary" onClick={openAddModal}>
              Add Contact
            </Button>
          </div>
        </div>

        <ContactList
          contacts={filteredContacts}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onEdit={openEditModal}
          onDelete={openSingleDelete}
        />
      </section>

      <AddContactModal
        isOpen={isModalOpen}
        mode={modalMode}
        contact={editingContact || undefined}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitModal}
      />

      <ConfirmDialog
        open={isConfirmOpen}
        count={pendingDeleteIds.length}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Layout>
  );
};

export default App;
