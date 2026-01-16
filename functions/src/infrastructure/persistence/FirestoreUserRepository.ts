
import admin from "firebase-admin";
import {firestore} from "../config/firebase";

import {User} from "../../domain/user/entities/User";
import {UserRepository} from "../../domain/user/repository/UserRepository";
import {Email} from "../../domain/user/value-objects/Email";

type UserDoc = {
    email: string;
    createdAt: admin.firestore.Timestamp;
};

export class FirestoreUserRepository implements UserRepository {
    private readonly collection = firestore.collection("users");
    async save(user: User): Promise<void> {
        const userDoc: UserDoc = {
            email: user.email.getValue(),
            createdAt: admin.firestore.Timestamp.fromDate(user.createdAt),
        };
        await this.collection.doc(user.id).set(userDoc);
    }
    async findByEmail(email: Email): Promise<User | null> {
        const q = await this.collection.where("email", "==", email.getValue()).limit(1).get();
        if (q.empty) return null;

        const snap = q.docs[0];
        const data = snap.data() as UserDoc;
        return User.rehydrate({
            id: snap.id,
            email: data.email,
            createdAt: data.createdAt.toDate(),
        });
    }
    async findById(id: string): Promise<User | null> {
        const snap = await this.collection.doc(id).get();
        if (!snap.exists) return null;
        const data = snap.data() as UserDoc;
        return User.rehydrate({
            id: snap.id,
            email: data.email,
            createdAt: data.createdAt.toDate(),
        });
    }
}
