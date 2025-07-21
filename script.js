async function loadAsteroids() {
  const maxDistance = parseFloat(document.getElementById('maxDistance').value);
  const minValue = parseFloat(document.getElementById('minValue').value);
  const minMetal = parseFloat(document.getElementById('minMetal').value);

  const url = "https://www.asterank.com/api/asterank?query={}&limit=1000";

  const res = await fetch(url);
  const data = await res.json();

  const filtered = data.filter(a =>
    a.distance && a.estimated_value &&
    a.metal &&
    a.distance < maxDistance &&
    a.estimated_value > minValue &&
    a.metal > minMetal
  );

  const results = document.getElementById("results");
  results.innerHTML = "";

  filtered.forEach(a => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${a.full_name}</td>
      <td>$${a.estimated_value.toLocaleString()}</td>
      <td>${a.distance.toFixed(3)}</td>
      <td>${(a.metal * 100).toFixed(1)}%</td>
      <td>${a.deltav ? a.deltav.toFixed(2) : "?"}</td>
    `;
    results.appendChild(row);
  });
}
