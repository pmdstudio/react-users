export type User = {
    id: number
    name: string
    email: string
    username: string
    address: {
        street: string;
        suite: string;
        city: string;
    };
}

export type Users = User[];