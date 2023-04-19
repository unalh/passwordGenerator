const lengthSlider = document.querySelector(".pass-length input"),
  options = document.querySelectorAll(".option input"),
  passwordInput = document.querySelector(".input-box input"),
  copyIcon = document.querySelector(".input-box span"),
  passIndicator = document.querySelector(".pass-indicator"),
  btnGenerate = document.querySelector(".btn-generate"); 

const characters = {
    kucukharf: "abcçdefgğhıijklmnoöprsştuwüvyz",
    buyukharf: "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUWÜVYZ",
    sayilar: "0123456789",
    semboller: "^!$%&|[]{}:;.,*+-#@<>"

}
const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "boslukicersin") {
        staticPassword += characters[option.id];
      } else if (option.id === "boslukicersin") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicate = true;
      }
    }
  });
  for (let i = 0; i < passLength; i++) {

    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
     
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
    
      randomPassword += randomChar;
    }
  }
    passwordInput.value = randomPassword;
}
const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 10 ? "zayif" : lengthSlider.value <= 16 ? "orta" : lengthSlider.value <= 25 ? "guclu": "cokguclu";
}

const updateSlider = () => {
   document.querySelector(".pass-length span").innerText = lengthSlider.value;
   generatePassword();
   updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText ="check";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
    }, 1500);
}

copyIcon.addEventListener("click",copyPassword);

lengthSlider.addEventListener("input", updateSlider);
btnGenerate.addEventListener("click", generatePassword);