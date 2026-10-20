import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_PATH = path.join(__dirname, "../data/bookings.json");

class BookingsDAO {
    constructor(filePath = FILE_PATH) {
        this.filePath = filePath;
    }

    async #readFile() {
        try {
            const content = await fs.readFile(this.filePath, "utf-8");
            return content.trim() ? JSON.parse(content) : [];
        } catch (error) {
            if (error.code === "ENOENT") return [];
            throw error;
        }
    }

    async #writeFile(data) {
        await fs.mkdir(path.dirname(this.filePath), { recursive: true });
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async create(data) {
        const items = await this.#readFile();
        const newItem = { id: crypto.randomUUID(), ...data };
        items.push(newItem);
        await this.#writeFile(items);
        return newItem;
    }

    async getById(id) {
        const items = await this.#readFile();
        return items.find((item) => item.id === id) || null;
    }

    async update(id, data) {
        const items = await this.#readFile();
        const index = items.findIndex((item) => item.id === id);
        if (index === -1) return null;

        items[index] = { ...items[index], ...data, id: items[index].id };
        await this.#writeFile(items);
        return items[index];
    }
}

export default new BookingsDAO();