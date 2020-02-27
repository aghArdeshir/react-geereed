import { useState } from "react";

export function useGeereedSearch(): [string, (searchTerm: string) => void] {
    const [searchTerm, setSearchTerm] = useState('');

    return [searchTerm, setSearchTerm];
}