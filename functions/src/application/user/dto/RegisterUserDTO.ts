export type RegisterUserRequestDTO = {
    email: string;
};

export type RegisterUserResponseDTO = {
    id: string;
    email: string;
    createdAt: string;
    token: string;
};
