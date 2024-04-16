import { useContext } from "react";
import authContext from "@/context/authProvider";

export default function useAuth() {
    return useContext(authContext);
}