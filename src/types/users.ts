export type Address = {
    street: string;
    suite: string;
    city: string;
};

export type User = {
    id: number
    name: string
    email: string
    username: string
    address: Address;
}

export type Users = User[];