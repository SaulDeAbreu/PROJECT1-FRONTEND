import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJyqqIVyDemZ4nqfwc7_cOyRnaoXx3O2s",
  authDomain: "project-1-ae5e8.firebaseapp.com",
  projectId: "project-1-ae5e8",
  storageBucket: "project-1-ae5e8.appspot.com",
  messagingSenderId: "807906344532",
  appId: "1:807906344532:web:8aa4a094be8575fdf177c1",
};const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const comentariosCollection = collection(db, "comentarios");

export const agregarComentario = async (comentarioData) => {
  try {
    const docRef = await addDoc(comentariosCollection, comentarioData);
    console.log("Comentario agregado con ID:", docRef.id);
  } catch (error) {
    console.error("Error al agregar el comentario:", error);
  }
};

export const suscribirseComentarios = (callback) => {
  return onSnapshot(comentariosCollection, (snapshot) => {
    const comentarios = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(comentarios);
  });
};

export const borrarComentarioFirestore = async (comentarioId) => {
  try {
    await deleteDoc(doc(db, 'comentarios', comentarioId));
    console.log('Comentario eliminado con ID:', comentarioId);
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
  }
};