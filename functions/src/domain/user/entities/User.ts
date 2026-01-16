import {Email} from "../value-objects/Email";

export type UserProps = {
    id: string;
    email: Email;
    createdAt: Date;
};

export class User {
    private constructor(private readonly props: UserProps) { }

    static create(params: { id: string; email: Email; createdAt?: Date }): User {
        return new User({
            id: params.id,
            email: params.email,
            createdAt: params.createdAt ?? new Date(),
        });
    }

    static rehydrate(input:{ id:string, email:string, createdAt:Date }): User {
        return new User({
            id: input.id,
            email: Email.create(input.email),
            createdAt: input.createdAt,
        });
    }
    get id(): string {
        return this.props.id;
    }

    get email(): Email {
        return this.props.email;
    }

    get createdAt(): Date {
        return new Date(this.props.createdAt.getTime());
    }
}
