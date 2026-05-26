const EXTENSION_ID = "com.monextension.fiches_simples";
const templates = {
  mayak: { image: "mayak.png", class: "Chasseresse" },
  bawak: { image: "bawak.png", class: "Guérisseur" },
  cylak: { image: "cylak.png", class: "Sorçière" },
  borak: { image: "borak.png", class: "Protecteur" }
};
let currentStats = { mayak: {res:20}, bawak: {res:20}, cylak: {res:20}, borak: {res:20} };

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnSave").addEventListener("click", () => {
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentStats));
    const a = document.createElement('a'); a.href = data; a.download = "stats.json"; a.click();
  });
  document.getElementById("btnLoad").addEventListener("click", () => document.getElementById('fileInput').click());
  document.getElementById('fileInput').addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      currentStats = JSON.parse(event.target.result);
      if (typeof OBR !== 'undefined') OBR.room.setMetadata({ [EXTENSION_ID]: currentStats });
      render();
    };
    reader.readAsText(e.target.files[0]);
  });
  render();
});

function render() {
  const sel = document.getElementById("charSelect");
  if(sel.options.length === 0) {
    Object.keys(templates).forEach(k => {
      let opt = document.createElement("option"); opt.value = k; opt.textContent = k;
      sel.appendChild(opt);
    });
  }
  document.getElementById("charBanner").src = templates[sel.value].image;
}
// ... suite de ton code ...

function render() {
  const sel = document.getElementById("charSelect");
  if(sel.options.length === 0) {
    Object.keys(templates).forEach(k => {
      let opt = document.createElement("option"); opt.value = k; opt.textContent = k;
      sel.appendChild(opt);
    });
  }
  document.getElementById("charBanner").src = templates[sel.value].image;
  
  // ICI : On appelle la fonction qui affiche tes stats
  renderStatsList();
}
// CETTE PARTIE DOIT ÊTRE À LA FIN DU FICHIER
function renderStatsList() {
    const container = document.getElementById("statsContainer");
    container.innerHTML = ""; 

    // Liste des stats à afficher
    const stats = ["Résistance", "Choc", "Lien", "Essence"];
    
    stats.forEach(stat => {
        const label = document.createElement("label");
        label.innerText = stat;
        container.appendChild(label);

        const input = document.createElement("input");
        input.type = "number";
        input.value = 10; // Ici, tu pourras récupérer la valeur de currentStats
        container.appendChild(input);
        
        // Un espace vide pour la grille
        container.appendChild(document.createElement("div"));
    });
}
