import "./components/Loader.js";
import { fetchApi } from "./utils/fetch.js"; // sesuaikan path
import "./components/AppBar.js";
import "./components/UserInfo.js";
import "./components/NoteInput.js";
import "./components/NoteList.js";
import "./components/NoteItem.js";
import "./components/AppFooter.js";
import "./output.css";

// Ambil loader dari DOM
const loader = document.querySelector("#loader");

// Manajemen data catatan
const noteData = {
  notes: [],
  async getNotes() {
    try {
      const notes = await fetchApi('notes');
      this.notes = notes;
      return this.notes;
    } catch (error) {
      console.error("Error loading notes:", error);
      return [];
    }
  },

  async addNote({ title, body }) {
    try {
      const newNote = {
        title,
        body,
      };

      const savedNote = await fetchApi('notes', 'POST', newNote);
      this.notes.push(savedNote);
      this._triggerEvent();
      return savedNote;
    } catch (error) {
      console.error("Error adding note:", error);
      return null;
    }
  },

  async deleteNote(id) {
    try {
      await fetchApi(`notes/${id}`, 'DELETE');
      this.notes = this.notes.filter(note => note.id !== id);
      this._triggerEvent();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  },

  _triggerEvent() {
    document.dispatchEvent(new Event("notes-changed"));
  },
};

// Inisialisasi aplikasi
document.addEventListener("DOMContentLoaded", async () => {

  const notes = await noteData.getNotes();
  const noteListElement = document.querySelector("note-list");
  noteListElement.notes = notes;

  const noteInputElement = document.querySelector("note-input");
  noteInputElement.addEventListener("note-submit", async (event) => {
    const { title, body } = event.detail;

    if (title && title.trim().length < 3) {
      alert("Pastikan judul memiliki minimal 3 karakter.");
    } else if (body && body.trim().length < 10) {
      alert("Pastikan catatan memiliki minimal 10 karakter.");
    } else {
      loader.show({ title: "Loading...", message: "Please wait." });

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi loading

      loader.success({ title: "Success!", message: "Added note." });
      loader.hide(1200); // Tampilkan centang dulu, lalu hilang
      await noteData.addNote(event.detail);
    }
  });

  document.addEventListener("note-delete", async (event) => {
    const idToDelete = event.detail.id;

    // Tampilkan loader jika perlu
    loader.show({ title: "Deleting...", message: "Removing note from app." });

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi loading

    loader.success({ title: "Success!", message: "Note removed." });
    loader.hide(1200); // Tampilkan centang dulu, lalu hilang

    // Hapus dari server dan update state
    await noteData.deleteNote(idToDelete);

    // Trigger render ulang
    document.dispatchEvent(new Event("notes-changed"));
  });

  document.addEventListener("notes-changed", () => {
    noteListElement.notes = noteData.notes;
  });
});