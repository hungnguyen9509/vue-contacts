import { auth, firestore } from "@/firebase";
import type { AuthCredentials } from "@/models/AuthCredentials";
import type { RegisterCredentials } from "@/models/RegisterCredentials";
import type { UserInfo } from "@/models/UserInfo";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  const user = ref<User | null>(null);
  const userInfo = ref<UserInfo>({
    email: "",
    username: "",
  });

  const login = async (authCredentials: AuthCredentials) => {
    const { email, password } = authCredentials;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    user.value = userCredential.user;

    router.push({ name: "home" });
  };

  const logout = async () => {
    await signOut(auth);
    router.push({ name: "login" });
    user.value = null;
    userInfo.value.email = "";
    userInfo.value.username = "";
  };

  const register = async (registerCredentials: RegisterCredentials) => {
    const { email, password, username } = registerCredentials;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(firestore, "users", userCredential.user.uid), {
      username,
      email,
    });

    router.push({ name: "home" });
  };

  const getCurrentUser = async (_user: User) => {
    user.value = _user;
    const docSnap = await getDoc(doc(firestore, "users", _user.uid));
    if (docSnap.exists()) {
      userInfo.value.email = docSnap.data()?.email;
      userInfo.value.username = docSnap.data()?.username;
    }
  };

  const forgotPassword = async (userEmail: { email: string }) => {
    await sendPasswordResetEmail(auth, userEmail.email);
  };

  return {
    login,
    logout,
    register,
    forgotPassword,
    getCurrentUser,
    user,
    userInfo,
  };
});

export default useAuthStore;
