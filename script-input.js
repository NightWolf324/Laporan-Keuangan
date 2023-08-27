const inputForm = document.getElementById('input-form');

inputForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const tanggal = document.getElementById('tanggal').value;
    const keterangan = document.getElementById('keterangan').value;
    const nominal = parseFloat(document.getElementById('nominal').value);

    // Ambil data dari cookies (jika ada)
    // const existingData = getExistingDataFromCookies();

    // Ambil data dari LocalStorage (jika ada)
    const existingData = getExistingDataFromLocalStorage();

    // Tambahkan data baru ke array existingData
    existingData.push({ tanggal, keterangan, nominal });

    // Simpan data ke cookies
    // saveDataToCookies(existingData);

    // Simpan data ke LocalStorage
    saveDataToLocalStorage(existingData);

    // Setelah data ditambahkan, bisa mengarahkan kembali ke halaman pertama
    window.location.href = 'index.html';
});

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

// Fungsi untuk menyimpan data ke cookies
// function saveDataToCookies(data) {
//     const dataString = JSON.stringify(data);
//     document.cookie = `keuanganData=${encodeURIComponent(dataString)}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
// }

// Fungsi untuk menyimpan data ke LocalStorage
function saveDataToLocalStorage(data) {
    localStorage.setItem('keuangan', JSON.stringify(data));
}

