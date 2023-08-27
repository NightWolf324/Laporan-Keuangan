const inputForm = document.getElementById('input-form');

inputForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const tanggal = document.getElementById('tanggal').value;
    const keterangan = document.getElementById('keterangan').value;
    const nominal = parseFloat(document.getElementById('nominal').value);

    // Simpan data ke localStorage
    const newData = { tanggal, keterangan, nominal };
    const existingData = JSON.parse(localStorage.getItem('keuangan')) || [];
    existingData.push(newData);
    localStorage.setItem('keuangan', JSON.stringify(existingData));

    // Setelah data ditambahkan, bisa mengarahkan kembali ke halaman pertama
    window.location.href = 'index.html';
});
