import React, { useEffect, useState } from "react";
import styles from "./AddContactModal.module.css";
import Button from "../Button/Button";
import type { Contact } from "../../store/contactsSlice";

interface AddContactModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  contact?: Contact | null;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    contactNo?: string;
    addressLine1: string;
    addressLine2?: string;
    pincode: string;
    state: string;
  }) => void;
}

interface FormState {
  name: string;
  email: string;
  contactNo: string;
  addressLine1: string;
  addressLine2: string;
  pincode: string;
  state: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  addressLine1?: string;
  pincode?: string;
  state?: string;
}

const STATES = [
  "Andhra Pradesh",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Punjab",
];

const emptyForm: FormState = {
  name: "",
  email: "",
  contactNo: "",
  addressLine1: "",
  addressLine2: "",
  pincode: "",
  state: "",
};

const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  mode,
  contact,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isOpen && mode === "edit" && contact) {
      setForm({
        name: contact.name,
        email: contact.email,
        contactNo: contact.contactNo || "",
        addressLine1: contact.addressLine1,
        addressLine2: contact.addressLine2 || "",
        pincode: contact.pincode,
        state: contact.state,
      });
      setErrors({});
    } else if (isOpen && mode === "add") {
      setForm(emptyForm);
      setErrors({});
    }
  }, [isOpen, mode, contact]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "contactNo") {
      const digits = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, contactNo: digits.slice(0, 10) }));
      return;
    }

    if (name === "pincode") {
      const digits = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, pincode: digits.slice(0, 6) }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    ) {
      nextErrors.email = "Enter a valid email.";
    }

    if (!form.addressLine1.trim()) {
      nextErrors.addressLine1 = "Address Line 1 is required.";
    }

    if (!form.pincode.trim()) {
      nextErrors.pincode = "Pincode is required.";
    } else if (form.pincode.trim().length !== 6) {
      nextErrors.pincode = "Pincode must be 6 digits.";
    }

    if (!form.state.trim()) {
      nextErrors.state = "State is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      contactNo: form.contactNo || undefined,
      addressLine1: form.addressLine1.trim(),
      addressLine2: form.addressLine2.trim() || undefined,
      pincode: form.pincode.trim(),
      state: form.state.trim(),
    });
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const title = mode === "add" ? "Add Contact" : "Edit Contact";
  const primaryLabel = mode === "add" ? "Add Contact" : "Save Changes";

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.closeIcon}
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="name">
                Name<span className={styles.required}>*</span>
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? styles.hasError : undefined}
              />
              {errors.name && (
                <p className={styles.errorText}>{errors.name}</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="contactNo">Contact No.</label>
              <input
                id="contactNo"
                name="contactNo"
                value={form.contactNo}
                onChange={handleChange}
                maxLength={10}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">
                Email<span className={styles.required}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? styles.hasError : undefined}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="addressLine1">
                Address Line 1<span className={styles.required}>*</span>
              </label>
              <input
                id="addressLine1"
                name="addressLine1"
                value={form.addressLine1}
                onChange={handleChange}
                className={errors.addressLine1 ? styles.hasError : undefined}
              />
              {errors.addressLine1 && (
                <p className={styles.errorText}>{errors.addressLine1}</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="addressLine2">
                Address Line 2{" "}
                <span className={styles.optional}>(Optional)</span>
              </label>
              <input
                id="addressLine2"
                name="addressLine2"
                value={form.addressLine2}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="state">
                State<span className={styles.required}>*</span>
              </label>
              <select
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                className={errors.state ? styles.hasError : undefined}
              >
                <option value="">Enter State</option>
                {STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className={styles.errorText}>{errors.state}</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="pincode">
                Pincode<span className={styles.required}>*</span>
              </label>
              <input
                id="pincode"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                maxLength={6}
                className={errors.pincode ? styles.hasError : undefined}
              />
              {errors.pincode && (
                <p className={styles.errorText}>{errors.pincode}</p>
              )}
            </div>
          </div>

          <div className={styles.footer}>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {primaryLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;
