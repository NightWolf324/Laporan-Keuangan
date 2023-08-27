const tableBody = document.getElementById('table-body');

// Fungsi untuk mengubah angka menjadi format mata uang rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
}

// Ambil data dari localStorage dan tampilkan pada tabel
const storedData = JSON.parse(localStorage.getItem('keuangan')) || [];

// Fungsi untuk menghapus data berdasarkan indeks
function hapusData(index) {
    const storedData = JSON.parse(localStorage.getItem('keuangan')) || [];
    storedData.splice(index, 1);
    localStorage.setItem('keuangan', JSON.stringify(storedData));
    window.location.reload(); // Muat ulang halaman untuk memperbarui tampilan
}

storedData.forEach((data, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${data.tanggal}</td>
        <td>${data.keterangan}</td>
        <td>${formatRupiah(data.nominal)}</td>
        <td><button class="btn btn-danger" onclick="hapusData(${index})">Hapus</button></td>
    `;
    tableBody.appendChild(newRow);
});
