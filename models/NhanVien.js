class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";
  tongLuong = function () {
    if (this.chucvu == "Sếp") return this.luongCB * 1 * 3;
    else if (this.chucvu == "Trưởng phòng") return this.luongCB * 1 * 2;
    else return this.luongCB * 1;
  };
  loaiNv = function () {
    if (this.gioLam >= 192) return "Xuất sắc";
    else if (this.gioLam >= 176 && this.gioLam < 192) return "Giỏi";
    else if (this.gioLam >= 160 && this.gioLam < 176) return "Khá";
    else return "Trung Bình";
  };
}
