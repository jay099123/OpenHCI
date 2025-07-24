// services/planets.ts
import { planetsCollection } from "@/utils/firebase.browser";
import { DocumentData, Query, getDocs, doc, getDoc } from "firebase/firestore";

export interface Planet {
  id: string;
  name: string;
  image: string;
  color: string;
  title: string;
  description?: string;
  theme: string;
  isActive: boolean;
  createdAt: string;
}

export async function getAllPlanets(query?: Query): Promise<Planet[]> {
  let querySnapshot = null;

  if (query) {
    querySnapshot = await getDocs(query);
  } else {
    querySnapshot = await getDocs(planetsCollection);
  }

  const planets = querySnapshot.docs.map((doc: DocumentData) => {
    return { ...doc.data(), id: doc.id };
  });

  return planets as Planet[];
}

export async function getPlanetById(planetId: string): Promise<Planet | null> {
  const docRef = doc(planetsCollection, planetId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as Planet;
  }
  
  return null;
}