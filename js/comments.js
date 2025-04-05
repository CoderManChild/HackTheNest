// Functions for loading and posting comments on events

function loadComments(eventName, container) {
    const safeName = eventName.replace(/\s/g, "_");
    const comments = JSON.parse(localStorage.getItem(`comments-${safeName}`)) || [];
    container.innerHTML = `
      <h4>Comments:</h4>
      <div class="comment-list">
        ${comments.map(c => `<div class="comment">${c}</div>`).join("")}
      </div>
      <div class="comment-input">
        <input type="text" id="commentInput-${safeName}" placeholder="Add a comment..." />
        <button onclick="postComment('${eventName}')">Post</button>
      </div>
    `;
  }
  
  function postComment(eventName) {
    const safeName = eventName.replace(/\s/g, "_");
    const input = document.getElementById(`commentInput-${safeName}`);
    const text = input.value.trim();
    if (!text) return;
    let comments = JSON.parse(localStorage.getItem(`comments-${safeName}`)) || [];
    comments.push(text);
    localStorage.setItem(`comments-${safeName}`, JSON.stringify(comments));
    loadComments(eventName, document.getElementById(`comments-${safeName}`));
  }
  