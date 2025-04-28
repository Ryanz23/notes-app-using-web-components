import { fetchApi } from "../../utils/fetch";

class notes {
    constructor() {
        this.notes = [];
    }

    static async getNotes() {
        try {
            const notes = await fetchApi('notes');
            this.notesData = notes;
            return notes;
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    static async addNote({ title, body }) {
        try {
            const newNote = await fetchApi('notes', 'POST', { title, body });
            return newNote;
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }

    static async deleteNote(id) {
        try {
            await fetchApi(`notes/${id}`, 'DELETE');
            return id;
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }
}

export default new notes();