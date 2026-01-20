export type LoginRequestDTO = {
    email: string;
};

export type LoginResponseDTO = {
    user: User;
    token: string;
};


export type User = {
    id: string;
    email: string;
};

