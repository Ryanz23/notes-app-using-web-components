import { fetchApi } from "../../utils/fetch.js";

class Notes {
  constructor() {
    this.notes = [];
  }

  async getNotes() {
    try {
      const notes = await fetchApi("notes");
      this.notes = notes;
      return notes;
    } catch (error) {
      console.error("Error fetching notes:", error);
      return [];
    }
  }

  async addNote({ title, body }) {
    try {
      const newNote = await fetchApi("notes", "POST", { title, body });
      return newNote;
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  async deleteNote(id) {
    try {
      await fetchApi(`notes/${id}`, "DELETE");
      return id;
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }
}

export default new Notes();
