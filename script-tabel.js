const tableBody = document.getElementById('table-body');

// Fungsi untuk mengubah angka menjadi format mata uang rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
}

// Fungsi untuk menghitung total nominal
function hitungTotalNominal(data) {
    let total = 0;
    data.forEach(item => {
        total += item.nominal;
    });
    return total;
}

// Fungsi untuk menghapus data berdasarkan indeks
// function hapusData(index) {
//     const storedData = getExistingDataFromCookies();
//     storedData.splice(index, 1);
//     saveDataToCookies(storedData);
//     updateTableAndTotal(storedData); // Perbarui tampilan tabel dan total
// }

function hapusData(index) {
    const storedData = getExistingDataFromLocalStorage();
    storedData.splice(index, 1);
    saveDataToLocalStorage(storedData);
    updateTableAndTotal(storedData); // Perbarui tampilan tabel dan total
}

// Fungsi untuk memperbarui tampilan tabel dan total
function updateTableAndTotal(data) {
    tableBody.innerHTML = ''; // Kosongkan tabel sebelum diperbarui

    data.forEach((data, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${data.tanggal}</td>
            <td>${data.keterangan}</td>
            <td>${formatRupiah(data.nominal)}</td>
            <td><button class="btn btn-danger" onclick="hapusData(${index})">Hapus</button></td>
        `;
        tableBody.appendChild(newRow);
    });

    // Tampilkan total nominal di bawah tabel
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="2" class="text-right"><strong>Total:</strong></td>
        <td><strong>${formatRupiah(hitungTotalNominal(data))}</strong></td>
    `;
    tableBody.appendChild(totalRow);
}

// Fungsi untuk mengambil data dari cookies
// function getExistingDataFromCookies() {
//     const cookieData = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)keuanganData\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
//     return cookieData ? JSON.parse(cookieData) : [];
// }

// Fungsi untuk mengambil data dari LocalStorage
function getExistingDataFromLocalStorage() {
    const localStorageData = localStorage.getItem('keuangan');
    return localStorageData ? JSON.parse(localStorageData) : [];
}

// Inisialisasi halaman dengan data dari cookies
// const storedData = getExistingDataFromCookies();

// Inisialisasi halaman dengan data dari LocalStorage
const storedData = getExistingDataFromLocalStorage();
updateTableAndTotal(storedData);

// Fungsi untuk mengunduh data keuangan dalam bentuk PDF
// function unduhPDF() {
//     const doc = new jsPDF();
    
//     doc.text("Laporan Data Keuangan", 10, 10);
    
//     const tableData = [];
//     const tableHeaders = ["Tanggal", "Keterangan", "Nominal"];
    
//     storedData.forEach(data => {
//         tableData.push([data.tanggal, data.keterangan, formatRupiah(data.nominal)]);
//     });
    
//     doc.autoTable({
//         head: [tableHeaders],
//         body: tableData,
//         startY: 20
//     });
    
//     doc.save("Laporan_Data_Keuangan.pdf");
// }

// Tambahkan event listener pada tombol unduh PDF
// const downloadPDFBtn = document.getElementById('download-pdf-btn');
// downloadPDFBtn.addEventListener('click', unduhPDF);


// script-tabel.js

window.jsPDF = window.jspdf.jsPDF;

document.addEventListener("DOMContentLoaded", function () {
    const downloadPDFButton = document.getElementById("download-pdf-btn");
  
    downloadPDFButton.addEventListener("click", function () {
      // Membuat objek dokumen PDF
      const doc = new jsPDF();
  
      // Mengambil elemen tabel
      const table = document.querySelector("table");
  
      // Mendapatkan daftar baris dari elemen tbody tabel
      const rows = Array.from(table.querySelector("tbody").getElementsByTagName("tr"));
  
      // Menginisialisasi variabel untuk mengatur posisi vertikal saat menggambar tabel di PDF
      let verticalPosition = 15;
  
      // Iterasi melalui setiap baris tabel dan menambahkannya ke PDF
      rows.forEach(function (row) {
        const columns = row.getElementsByTagName("td");
        let horizontalPosition = 10;
  
        Array.from(columns).forEach(function (column) {
          doc.text(horizontalPosition, verticalPosition, column.innerText);
          horizontalPosition += 60; // Menyesuaikan jarak horizontal antar kolom
        });
  
        verticalPosition += 10; // Menyesuaikan jarak vertikal antar baris
      });
  
      // Mengunduh dokumen PDF dengan nama "laporan_keuangan.pdf"
      doc.save("laporan_keuangan.pdf");
    });
  });
  