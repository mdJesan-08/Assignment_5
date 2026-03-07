let allIssues = [];

const container = document.getElementById("issuesContainer");
const spinner = document.getElementById("spinner");
const issueCountEl = document.getElementById("issueCount");
const openCountEl = document.getElementById("openCount");
const closedCountEl = document.getElementById("closedCount");

// Load issues from API
async function loadIssues() {
  spinner.classList.remove("hidden");
  try {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;
    displayIssues(allIssues);
  } catch(err) {
    console.error("Error loading issues:", err);
  } finally {
    spinner.classList.add("hidden");
  }
}

// Update counts dynamically
function updateCounts(issues) {
  const open = issues.filter(i => i.status === "open").length;
  const closed = issues.filter(i => i.status === "closed").length;

  issueCountEl.innerText = issues.length + " Issues";
  openCountEl.innerText = "Open: " + open;
  closedCountEl.innerText = "Closed: " + closed;
}

// Display issues
function displayIssues(issues) {
  container.innerHTML = "";
  updateCounts(issues);

  issues.forEach(issue => {
    const borderColor = issue.status === "open" ? "border-green-500" : "border-purple-500";

    const card = document.createElement("div");
    card.className = `bg-white p-4 rounded shadow border-t-4 ${borderColor} cursor-pointer hover:shadow-lg transition`;

    // Pass correct issue ID to showDetails
    card.onclick = () => showDetails(my_modal_1.showModal());

    card.innerHTML = `
      <h2 class="font-bold text-lg">${issue.title}</h2>
      <p class="text-sm text-gray-500 mt-2">${issue.description}...</p>
      <div class="flex gap-2 mt-3">
        <span class="badge badge-outline bg-amber-300">${issue.category}</span>
        <span class="badge badge-outline">${issue.priority}</span>
      </div>
      <p class="text-xs mt-3 text-gray-400">#${issue._id} by ${issue.author}</p>
      <p class="text-xs text-gray-400">${new Date(issue.createdAt).toLocaleDateString()}</p>
    `;
    container.appendChild(card);
  });
}

// Filter issues
function filterIssues(status) {
  const filtered = allIssues.filter(issue => issue.status === status);
  displayIssues(filtered);
}

// Show all
function showAll() {
  displayIssues(allIssues);
}

// Search issues
async function searchIssues() {
  const text = document.getElementById("searchInput").value.trim();
  spinner.classList.remove("hidden");

  try {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
    const data = await res.json();
    displayIssues(data.data);
  } catch(err) {
    console.error("Search error:", err);
  } finally {
    spinner.classList.add("hidden");
  }
}

// Show issue modal
async function showDetails(id) {
  try {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;

    document.getElementById("modalTitle").innerText = issue.title;
    document.getElementById("modalStatus").innerText = "Status: " + issue.status;
    document.getElementById("modalAuthor").innerText = "Opened by " + issue.author;
    document.getElementById("modalDate").innerText = new Date(issue.createdAt).toLocaleDateString();
    document.getElementById("modalCategory").innerText = issue.category;
    document.getElementById("modalPriority").innerText = issue.priority;
    document.getElementById("modalDesc").innerText = issue.description;

    document.getElementById("issueModal").showModal();
  } catch(err) {
    console.error("Error showing details:", err);
  }
}

// Initialize
loadIssues();