export interface IUser {
    _id: string;
    username: string;
    displayName:string;
    phone: string;
    password: string;
    token:string;
}

export interface RegisterResponse {
    user: IUser;
    message: string;
}

export interface RegisterMutation {
    username: string;
    displayName:string;
    phone: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    error: string;
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface IItem {
    id: string,
    user: {
        id: string,
        displayName: string,
    };
    title: string
    description: string;
    price: number;
    image: string;
    category: string;
}
export interface IItemMutation {
    user: string | null;
    title: string,
    description: string;
    price: number;
    image: File | null;
    category: string;
}