export interface AppState {
    contacts: Contact[];
    counter: number;
}

export interface Contact {
    id: number;
    name: string;
}
