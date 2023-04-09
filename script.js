const popup = document.querySelector(".popup");

let isOnline = true,
  intervalId,
  timer = 10;

const checkConnection = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (err) {
    isOnline = false;
  }
  timer = 10;
  clearInterval(intervalId);
  handlePopup(isOnline);
};

const handlePopup = (s) => {
  if (s) {
    return popup.classList.remove("show");
  }
  popup.classList.add("show");

  intervalId = setInterval(() => {
    timer--;
    if (timer === 0) checkConnection();
    popup.querySelector(".desc b").innerText = timer;
  }, 1000);
};

setInterval(() => isOnline && checkConnection(), 3000);
