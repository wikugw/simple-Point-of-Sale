document.addEventListener('DOMContentLoaded', function () {
  var bill = document.querySelector("#bill");
  var menus = document.querySelectorAll(".menu");
  var tombolHapus = document.querySelectorAll(".clear");

  function hapusItem() {
    bill.addEventListener('click', function (e) {
      const li = e.target.parentElement;
      bill.removeChild(li);
      totall()
    });
  }

  menus.forEach(function (menu) {
    menu.addEventListener('click', function (e) {
      // buat var = nama & harga
      var nama = menu.querySelector("#nama").innerHTML;
      var harga = parseInt(menu.querySelector("#harga").value);
      // melakukan pengecekan thdp pesanan
      var dipesans = bill.querySelectorAll(".dipesan");
      for (var i = 0; i < dipesans.length; i++) {
        if (dipesans[i].querySelector("#nama").innerHTML == nama) {
          var jumlah = parseInt(dipesans[i].querySelector("#jumlah").innerHTML.replace('x ', ''));
          var newJumlah = jumlah + 1;
          var hargaJumlah = parseInt(dipesans[i].querySelector("#harga").innerHTML.replace('Rp.', ''));
          var newHarga = hargaJumlah + harga
          // var hargaBaru =
          var billItemContent = `
            <div class="col ml-2" id="nama">${nama}</div>
            <div class="col" id="jumlah">x ${newJumlah}</div>
            <div class="col" id="harga">Rp.${newHarga}</div>
          `;
          dipesans[i].innerHTML = billItemContent;
          totall()
          hapusItem()
          return
        }
      }
      // membuat element
      var billItem = document.createElement("div");
      billItem.classList.add("row");
      billItem.classList.add("justify-content-center");
      billItem.classList.add("my-2");
      billItem.classList.add("dipesan");
      var billItemContent = `
      <div class="col ml-2" id="nama">${nama}</div>
      <div class="col" id="jumlah">x 1</div>
      <div class="col" id="harga">Rp.${harga}</div>
    `;
      billItem.innerHTML = billItemContent;
      bill.append(billItem)
      totall()
      hapusItem()
    })
  })

  function totall() {
    var totals = bill.querySelectorAll(".dipesan");
    totalHarga = 0;
    totals.forEach(function (total) {
      var harga = parseInt(total.querySelector("#harga").innerHTML.replace('Rp.', ''));
      totalHarga = totalHarga + harga;
    })

    document.querySelector("#totalBayar").innerHTML = 'Rp.' + totalHarga;
    document.querySelector("#charge").innerHTML = 'Charge Rp.' + totalHarga;
  }

  tombolHapus.forEach(function (hapus) {
    hapus.addEventListener("click", function (e) {
      var totals = document.querySelectorAll(".dipesan");
      totals.forEach(function (total) {
        total.remove();
      })
      totall();
    })
  })

})






