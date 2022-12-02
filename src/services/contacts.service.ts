import { firestorage, firestore } from "@/firebase";
import type { Contact } from "@/models/Contact";
import useAuthStore from "@/stores/auth.store";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createOrEditContact = async (
  contact: Partial<Contact>,
  avatar: File | null
) => {
  const authStore = useAuthStore();
  const userId = authStore.$state.user?.uid;
  contact.birthday = contact.birthday || "";

  if (avatar) {
    const storageRef = ref(firestorage, `contactAvatars/${avatar.name}`);
    const result = await uploadBytes(storageRef, avatar);
    const avatarURL = await getDownloadURL(result.ref);
    contact.avatar = avatarURL;
  } else {
    contact.avatar =
      contact.avatar ||
      "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp";
  }

  if (contact.id) {
    const docRef = doc(firestore, `users/${userId}/contacts`, contact.id);
    await updateDoc(docRef, contact);
  } else {
    const docRef = doc(collection(firestore, `users/${userId}/contacts`));
    contact.id = docRef.id;
    await setDoc(docRef, {
      ...contact,
    });
  }
};

export const getContacts = async () => {
  const authStore = useAuthStore();
  const userId = authStore.$state.user?.uid;

  const q = query(
    collection(firestore, `users/${userId}/contacts`),
    orderBy("name", "asc")
  );

  const result = await getDocs(q);
  return result.docs.map((doc) => {
    const data = doc.data();
    const contact: Contact = {
      id: data.id,
      name: data.name,
      avatar: data.avatar,
      email: data.email,
      phone: data.phone,
      birthday: data.birthday,
    };
    return contact;
  });
};

export const getContact = async (id: string) => {
  const authStore = useAuthStore();
  const userId = authStore.$state.user?.uid;
  const result = await getDoc(doc(firestore, `users/${userId}/contacts`, id));
  if (result.exists()) {
    const data = result.data();
    const contact: Contact = {
      id: data.id,
      name: data.name,
      avatar: data.avatar,
      email: data.email,
      phone: data.phone,
      birthday: data.birthday,
    };
    return contact;
  }
  return null;
};

export const deleteContact = async (id: string) => {
  const authStore = useAuthStore();
  const userId = authStore.$state.user?.uid;
  await deleteDoc(doc(firestore, `users/${userId}/contacts`, id));
};
