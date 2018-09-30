function hello() {
  window.alert('hi');
}

function escapeHtml(unsafe_string) {
    return unsafe_string
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
