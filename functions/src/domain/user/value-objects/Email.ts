import {InvalidEmailError} from "../errors/InvalidEmailError";

export class Email {
    private constructor(private readonly value: string) {}

    static isValid(normalized: string): boolean {
        if (normalized.length === 0 || normalized.length > 254) return false;

        const [local, domain] = normalized.split("@");
        if (!local || !domain) return false;
        if (local.length > 64) return false;
        if (domain.length > 255) return false;

        if (/\s/.test(normalized)) return false;

        if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;

        const domainLabel = /^(?!-)[a-z0-9-]{1,63}(?<!-)$/i;
        const labels = domain.split(".");
        if (labels.length < 2) return false;
        if (!labels.every((l) => domainLabel.test(l))) return false;

        const EMAIL_REGEX =
            // eslint-disable-next-line max-len
            /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;


        return EMAIL_REGEX.test(normalized);
    }

    static create(raw: string): Email {
        const v = (raw ?? "").trim().toLowerCase();

        if (!Email.isValid(v)) throw new InvalidEmailError();
        return new Email(v);
    }


    getValue(): string {
        return this.value;
    }

    equals(other: Email): boolean {
        return this.value === other.value;
    }
}
