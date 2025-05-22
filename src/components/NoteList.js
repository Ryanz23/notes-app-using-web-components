import notes from "../data/api/notes.js";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this._notes = [];
  }

  get notes() {
    return this._notes;
  }

  set notes(newNotes) {
    this._notes = Array.isArray(newNotes) ? newNotes : [];
    this.render();
  }

  async connectedCallback() {
    // Gunakan indikator loading
    const loader = document.querySelector("#loader");

    if (loader && typeof loader.show === "function") {
      loader.show({ title: "Loading...", message: "Please wait." });

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi loading

      loader.success({ title: "Success!", message: "Notes loaded." });
      loader.hide(1200); // Tampilkan centang dulu, lalu hilang
    }
  }

  async loadNotes() {
    try {
      const notesData = await notes.getNotes();
      this.notes = notesData; // Gunakan setter untuk menggabungkan data
    } catch (error) {
      console.error("Error loading notes from API:", error);
    }
  }

  render() {
    this.innerHTML = `
            <div class="grid grid-cols-3 text-white gap-2 p-2">
                ${
                  this._notes && this._notes.length > 0
                    ? this._notes
                        .map(
                          (note) => `
                        <note-item 
                            id="${note.id}"
                            title="${note.title}"
                            date="${new Date(note.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}"
                            body="${note.body}"
                            class="border border-sky-950 rounded-lg p-2"
                        ></note-item>
                    `,
                        )
                        .join("")
                    : '<p class="empty-notes text-white">No notes found.</p>'
                }
            </div>
        `;
  }
}

customElements.define("note-list", NoteList);