import { Collection } from "discord.js";

export class CooldownHandler {
    collection: Collection<string, {
        date: Date,
        duration: number,
        timeout: NodeJS.Timeout
    }> = new Collection();

    has(str: string): boolean {
        return this.collection.has(str);
    }

    hasAny(str: string): boolean {
        return this.collection.hasAny(str);
    }

    set(str: string, duration: number) {
        this.collection.set(str, {
            date: new Date(),
            duration: duration,
            timeout: setTimeout(() => this.collection.delete(str), duration)
        });
    }

    clear(str: string) {
        if (this.has(str)) {
            clearTimeout(this.collection.get(str)!.timeout);
        }
    }
}