const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const moment = require("moment");

const client = new Client();
//jadwal pelajaran

client.on("qr", (qr) => {
  // Menampilkan kode QR pada terminal
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Bot siap digunakan");
});

client.on("message", async (message) => {
  if (message.body === "p") {
    // Balas pesan "pong"
    await message.reply("pong");
  }

  //tugas
  if (message.body == ".bot") {
    const contact = await message.getContact();
    const response = `Hallo ${contact.pushname} ! Ada yang bisa saya bantu?\n*Fitur list*\n.tugas (untuk menampilakn tugas)\n.pelajaran(pelajaran hari ini)\n.pelajaran kamis(menampilkan pelajaran sesuai yg di inginkan)`;
    message.reply(response);
  } else if (message.body == ".tugas") {
    const response =
      "Berikut daftar tugas yang belum selesai:\n*1.KOMPUTER, MASYARAKAT:* tugas klompok (makalah)\n*2.KOMUNIKASI DATA:* merangkum modul A.pertemuan\nawal sampai UTS B.UTS-UAS dan C.tugas klompok (makalah)\n*3.KOMPUTER GRAFIK:* setup instalasi Java di oracel\n*4.SISTEM OPERASI:* merangkum modul A.pertemuan awal sampai\nUTS B.UTS-UAS dan C.tugas klompok (makalah)\n*5.KALKULUS:* tugas 2 soal integrasi turunan\n*6.PKN: tugas klompok(makalah)*";
    message.reply(response);
  }

  //pelajaran
  if (message.body.toLowerCase() === ".pelajaran") {
    const hariIni = moment().format("dddd").toLowerCase();
    const pelajaran = getPelajaran(hariIni);
    const text = `Pelajaran hari ${moment().format("dddd")}: ${pelajaran}`;
    message.reply(text);
  } else if (message.body.toLowerCase() === ".pelajaran senin") {
    const pelajaran = getPelajaran("senin");
    const text = `Pelajaran hari Senin: ${pelajaran}`;
    message.reply(text);
  } else if (message.body.toLowerCase() === ".pelajaran selasa") {
    const pelajaran = getPelajaran("selasa");
    const text = `Pelajaran hari Selasa: ${pelajaran}`;
    message.reply(text);
  } else if (message.body.toLowerCase() === ".pelajaran rabu") {
    const pelajaran = getPelajaran("rabu");
    const text = `Pelajaran hari Rabu: ${pelajaran}`;
    message.reply(text);
  } else if (message.body.toLowerCase() === ".pelajaran kamis") {
    const pelajaran = getPelajaran("kamis");
    const text = `Pelajaran hari Kamis: ${pelajaran}`;
    message.reply(text);
  } else if (message.body.toLowerCase() === ".pelajaran jumat") {
    const pelajaran = getPelajaran("jumat");
    const text = `Pelajaran hari Jumat: ${pelajaran}`;
    message.reply(text);
  }
});

// Fungsi untuk mendapatkan pelajaran pada hari tertentu
function getPelajaran(hari) {
  const pelajaran = {
    senin: "Komputer dan Masyarakan",
    selasa: "Komunikasi Data, Komputer Grafik",
    rabu: "Sistem Oprasi, Pengantar Oprasi komputer",
    kamis: "Kalkulus II, Pendidikan Kewarganegaraan",
    jumat: "B.Indonesia, B.Inggris",
  };
  return pelajaran[hari] || "Tidak ada pelajaran";
}

client.initialize();
