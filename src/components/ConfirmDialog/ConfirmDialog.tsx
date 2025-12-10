import React from "react";
import styles from "./ConfirmDialog.module.css";
import Button from "../Button/Button";
import deleteIcon from "../../delete-confirm.png";

interface ConfirmDialogProps {
  open: boolean;
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  count,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  const isBulk = count > 1;
  const title = isBulk ? `Delete Contact(${count})` : "Delete Contact";
  const message = isBulk
    ? `Are you sure you want to delete all ${count} contacts? This action cannot be undone.`
    : "Are you sure you want to delete this contact? This action cannot be undone.";

  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <img src={deleteIcon} alt="" className={styles.icon} />
            <h2 className={styles.title}>{title}</h2>
          </div>
          <button
            type="button"
            className={styles.closeIcon}
            onClick={onCancel}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
