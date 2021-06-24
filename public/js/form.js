//get the form
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let mail = new FormData(form);

    sendMail(mail);
  });
}
const sendMail = (mail) => {
  fetch("https://glen.work/send", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
};
