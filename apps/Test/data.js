async function fetchText(params) {
    const response = await fetch("https://MCWeb.ashvalde.com/");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const texto = await response.json();
    document.getElementById("inputTextaso").innerHTML = texto;
}
fetchText();