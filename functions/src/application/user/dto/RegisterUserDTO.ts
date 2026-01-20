export type RegisterUserRequestDTO = {
    email: string;
};

export type RegisterUserResponseDTO = {
    user: User;
    token: string;
};

export type User = {
    id: string;
    email: string;
};

