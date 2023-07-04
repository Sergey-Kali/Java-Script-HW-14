const mainImage = document.querySelector(".main-image");
const projectsText = document.querySelector(".projects-text");

function scaleMainImage() {
  mainImage.classList.toggle("main-image__scale");
}

mainImage.addEventListener("click", scaleMainImage);

const navSpan = document.querySelectorAll(".nav-span");

function pressTheKeyToNavigate(e) {
  [...navSpan].forEach((element) => {
    if (e.code[e.code.length - 1] === element.textContent) {
      element.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });
}

document.addEventListener("keydown", pressTheKeyToNavigate);

class GithubAPI {
  constructor(token, username) {
    this.token = token;
    this.username = username;
  }

  getRepos() {
    const headers = {
      Authorization: `${this.token}`,
    };

    return fetch(`https://api.github.com/users/${this.username}/repos`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

const GIT_ACCESS_TOKEN = "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";
const USER_NAME = "Sergey-Kali";

const github = new GithubAPI(GIT_ACCESS_TOKEN, USER_NAME);

window.addEventListener("DOMContentLoaded", () => {
  github.getRepos().then((repos) => {
    const markup = repos
      .map(
        (repo) => `<li><p class="projects-text__name">${repo.full_name}</p>
          <a class="projects-text__link" href="${
            repo.html_url
          }" target="_blank">${repo.name}</a>
          ${
            repo.description
              ? `<p class="projects-text__description">${repo.description}</p>`
              : ""
          }</li>`
      )
      .join("");
    projectsText.innerHTML = markup;
  });
});
