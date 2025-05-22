class Loader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="loader-backdrop" style="display: none;" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div id="loader-box" class="bg-white px-6 py-4 rounded-lg shadow-lg text-black text-center">
          <div id="loader-spinner" class="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 mx-auto mb-2"></div>
          <svg id="loader-checkmark" class="hidden w-10 h-10 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p class="font-semibold" id="loader-title">Loading...</p>
          <p id="loader-message">Please wait.</p>
        </div>
      </div>
    `;
  }

  show({ title = "Loading...", message = "Please wait." } = {}) {
    this.querySelector("#loader-title").textContent = title;
    this.querySelector("#loader-message").textContent = message;

    this.querySelector("#loader-spinner").classList.remove("hidden");
    this.querySelector("#loader-checkmark").classList.add("hidden");

    this.querySelector("#loader-backdrop").style.display = "flex";
  }

  success({ title = "Success!", message = "Data loaded." } = {}) {
    this.querySelector("#loader-title").textContent = title;
    this.querySelector("#loader-message").textContent = message;

    this.querySelector("#loader-spinner").classList.add("hidden");
    this.querySelector("#loader-checkmark").classList.remove("hidden");
  }

  hide(delay = 1000) {
    // Sembunyikan loader setelah delay (default: 1 detik untuk tampilkan centang dulu)
    setTimeout(() => {
      this.querySelector("#loader-backdrop").style.display = "none";
    }, delay);
  }
}

customElements.define("app-loader", Loader);