import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";


export const login = async (email:string, password:string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user as unknown as {email:string,accessToken:string};
    console.log("Logged in:", user);
    return {email:user.email,accessToken:user.accessToken};
    
  } catch (error) {
    if(error instanceof Error)
    console.error("Login error:", error.message);
  }
};