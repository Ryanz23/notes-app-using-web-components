class NoteItem extends HTMLElement {
  connectedCallback() {
    this.title = this.getAttribute("title") || "";
    this.date = this.getAttribute("date") || "";
    this.body = this.getAttribute("body") || "";
    this.noteId = this.getAttribute("id");
    this.render();
  }

  _setupDeleteButton() {
    const deleteBtn = this.querySelector(".delete-button");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("note-delete", {
          detail: { id: this.noteId },
          bubbles: true,
          composed: true
        }));
      });
    }
  }

  render() {
    this.innerHTML = `
            <div class="bg-sky-950 bg-opacity-50 p-4 rounded-lg md:text-[18px] sm:text-[14px]">
                <h3 class="font-bold">${this.title}</h3>
                <p class="italic text-[16px]">${this.date}</p>
                <div class="h-0.5 w-full bg-white my-2"></div>
                <p class="text-[16px]">${this.body}</p>
                <button class="delete-button bg-red-500 mt-2 w-full text-white rounded-md p-2 text-red-500 hover:bg-red-700 transition-all">
                  Delete
                </button>
            </div>
        `;

    this._setupDeleteButton();
  }
}

customElements.define("note-item", NoteItem);