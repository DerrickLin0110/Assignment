function calculateHeron() {
    const a = parseFloat(document.getElementById('sidea').value);
    const b = parseFloat(document.getElementById('sideb').value);
    const c = parseFloat(document.getElementById('sidec').value);
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    document.getElementById('area').value = area.toFixed(2);
}
