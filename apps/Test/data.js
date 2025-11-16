async function fetchText(params) {
    const response = await fetch("https://biblioteca.ashvalde.com/minecraft/libro.txt");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let texto = await response.text();
    texto = texto.replaceAll("\n--- Página ---","")
    document.getElementById("inputTextaso").textContent  = texto;
}
fetchText();