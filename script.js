const mainPage = document.getElementById("mainpage");
const projectPage = document.getElementById("projectpage");
const journalPage = document.getElementById("journalpage");

const mainButton = document.getElementById("mainbutton");
const journalButton = document.getElementById("journalbutton");
const projectButton = document.getElementById("projectbutton");

function showMainPage() {
  // Show page content
  mainPage.style.display = "block";
  projectPage.style.display = "none";
  journalPage.style.display = "none";
 // Button text change
  projectButton.classList.add("text-white");
  journalButton.classList.add("text-white");

  mainButton.classList.add("text-secondary");
  mainButton.classList.remove("text-white");
}

function showProjectPage() {
  // Show page content
  mainPage.style.display = "none";
  projectPage.style.display = "block";
  journalPage.style.display = "none";

  // Button text change
  mainButton.classList.add("text-white");
  journalButton.classList.add("text-white");

  projectButton.classList.add("text-secondary");
  projectButton.classList.remove("text-white");
}

function showJournalPage() {
  // Show page content
  mainPage.style.display = "none";
  projectPage.style.display = "none";
  journalPage.style.display = "block";

  // Button text change
  mainButton.classList.add("text-white");
  projectButton.classList.add("text-white");

  journalButton.classList.add("text-secondary");
  journalButton.classList.remove("text-white");
}

showMainPage();