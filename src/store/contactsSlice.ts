import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
  id: string;
  name: string;
  email: string;
  contactNo?: string;
  addressLine1: string;
  addressLine2?: string;
  pincode: string;
  state: string;
}

export interface ContactsState {
  items: Contact[];
  selectedIds: string[];
}

export type ContactInput = Omit<Contact, "id">;

interface UpdateContactPayload {
  id: string;
  changes: ContactInput;
}

const initialState: ContactsState = {
  items: [
    {
      id: "1",
      name: "Priya Sharma",
      email: "example.priya@gmail.com",
      contactNo: "9873483332",
      addressLine1: "Plot No. 57, Industrial Area Phase 2",
      addressLine2: "Chandigarh, Punjab, 160002",
      pincode: "160002",
      state: "Punjab",
    },
    {
      id: "2",
      name: "Rahul Mehta",
      email: "example.rahul@example.com",
      contactNo: "9123483332",
      addressLine1: "Unit 4B, MIDC Taloja, Sector 10",
      addressLine2: "Navi Mumbai, Maharashtra, 410208",
      pincode: "410208",
      state: "Maharashtra",
    },
    {
      id: "3",
      name: "Param Aggarwal",
      email: "param.xyz.mail@gmail.com",
      contactNo: "9478877767",
      addressLine1: "",
      addressLine2: "Firozpur",
      pincode: "152004",
      state: "Punjab",
    },
    {
      id: "4",
      name: "Jatin Malhotra",
      email: "jatin.malhotra@gmail.com",
      contactNo: "9123445332",
      addressLine1: "Sector 10, Gurugram",
      addressLine2: "",
      pincode: "122008",
      state: "Haryana",
    },
    {
      id: "5",
      name: "Aditya",
      email: "aditya.work@yahoo.in",
      contactNo: "9464747884",
      addressLine1: "Koramangla",
      addressLine2: "bangalore",
      pincode: "444208",
      state: "Karnataka",
    },
    {
      id: "6",
      name: "Interviewer",
      email: "para_5764@@gov.in",
      contactNo: "94994444",
      addressLine1: "Nangal",
      addressLine2: "",
      pincode: "142005",
      state: "Punjab",
    }
  ],
  selectedIds: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactInput>) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? (crypto as Crypto).randomUUID()
          : String(Date.now());
      state.items.push({ id, ...action.payload });
    },
    updateContact: (state, action: PayloadAction<UpdateContactPayload>) => {
      const { id, changes } = action.payload;
      const index = state.items.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...changes, id };
      }
    },
    removeContacts: (state, action: PayloadAction<string[]>) => {
      const toRemove = new Set(action.payload);
      state.items = state.items.filter((item) => !toRemove.has(item.id));
      state.selectedIds = state.selectedIds.filter((id) => !toRemove.has(id));
    },
    toggleSelect: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((s) => s !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
  },
});

export const {
  addContact,
  updateContact,
  removeContacts,
  toggleSelect,
  clearSelection,
} = contactsSlice.actions;

export default contactsSlice.reducer;
