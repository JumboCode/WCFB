function hello() {
  window.alert('hi');
}

// Function: sanitize_string
// Input: String to be sanitized
// Returns: Sanitized string
// Does: Sanitizes string
function sanitize_string(unsafe_string) {
    return unsafe_string
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
