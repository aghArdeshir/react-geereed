import { useState } from "react";
import { IUseGeereedSearch } from "../typings";

export function useGeereedSearch(): IUseGeereedSearch {
    const [searchTerm, setSearchTerm] = useState('');

    return [searchTerm, setSearchTerm];
}