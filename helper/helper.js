class Helper {

    static formatRupiah(price) {
        let separator,prefix
        let number_string = price.toString().replace(/[^,\d]/g, '')
        let split = number_string.split(',')
        let sisa = split[0].length % 3
        let rupiah = split[0].substr(0, sisa)
        let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    
        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if(ribuan){
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
    
        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? 'Rp. ' + rupiah : (rupiah ? rupiah : '');
      }

}

module.exports = Helper