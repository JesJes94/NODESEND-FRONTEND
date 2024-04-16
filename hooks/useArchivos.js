import { useContext } from "react";
import ArchivosContext from "@/context/archivosProvider";

export default function useArchivos() {
    return useContext(ArchivosContext);
}