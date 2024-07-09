// Tạo một mảng nhân viên
let arrNhanVien = [];

// Lấy dữ liệu từ Local để render lên table danh sách nhân viên
getLocalStorage();
// Lấy giá trị input từ form
function getValueForm() {
  let nhanVien = new NhanVien();
  let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
  let isValid = true;
  for (let field of arrField) {
    let { id, value } = field;
    nhanVien[id] = value;

    let parentEle = field.parentElement;
    let errorEle = parentEle.querySelector("span");
    // validation rỗng
    let isValidEmpty = checkEmptyValue(value, errorEle);
    isValid &= isValidEmpty;
    if (!isValidEmpty) {
      continue;
    }
    // validation tài khoản và kiểm tra tài khoản có tồn tại hay chưa
    if (id == "tknv") {
      isValid &= checkTaiKhoan(value, errorEle);
    }
    // validation họ tên
    if (id == "name") {
      isValid &= checkName(value, errorEle);
    }
    // validation email
    if (id == "email") {
      isValid &= checkEmail(value, errorEle);
    }
    // validation mật khẩu
    if (id == "password") {
      isValid &= checkPassword(value, errorEle);
    }
    // validation ngày làm
    if (id == "datepicker") {
      isValid &= checkDate(value, errorEle);
    }
    // validation lương cơ bản
    if (id == "luongCB") {
      isValid &= checkLuong(value, errorEle);
    }
    // validation chức vụ
    if (id == "chucvu") {
      isValid &= checkChucVu(value, errorEle);
    }
    // validation giờ làm
    if (id == "gioLam") {
      isValid &= checkGioLam(value, errorEle);
    }
  }
  if (isValid) {
    return nhanVien;
  }
}

// Chức năng thêm nhân viên : done
document.getElementById("formQLNV").onsubmit = function (event) {
  event.preventDefault();
  let nhanVien = getValueForm();
  if (!nhanVien) {
    return;
  }
  arrNhanVien.push(nhanVien);
  event.target.reset();
  // Hiển thị danh sách nhân viên ngay khi vừa thêm vào mảng
  renderListNhanVien();
  // Lưu dữ liệu vào Local Storage
  saveLocalStorage();
};

document.getElementById("tbTKNV").innerHTML = "Tài khoản đã tồn tại";
// Hiển thị danh sách nhân viên
function renderListNhanVien(arr = arrNhanVien) {
  let content = "";
  arr.forEach((item, index) => {
    let nhanVien = new NhanVien();
    Object.assign(nhanVien, item);
    let { tknv, name, email, datepicker, chucvu } = nhanVien;
    content += `
    <tr>
        <td>${tknv}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${datepicker}</td>
        <td>${chucvu}</td>
        <td>${nhanVien
          .tongLuong()
          .toLocaleString("vi", { style: "currency", currency: "VND" })}</td>
        <td>${nhanVien.loaiNv()}</td>
        <td>
            <button onclick="deleteNhanVien('${tknv}')" class="btn btn-danger">Xóa</button>
             <button onclick="getInfoNhanVien('${tknv}')" class="btn btn-warning"  
            data-toggle="modal"
            data-target="#myModal">Sửa</button>
        </td>
    </tr>
    `;
  });
  document.getElementById("tableDanhSach").innerHTML = content;
}

// Chức năng Xóa : done
function deleteNhanVien(tknv) {
  let index = arrNhanVien.findIndex((item, index) => item.tknv == tknv);
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    // Cập nhật danh sách nhân viên ngay sau khi xóa đối tượng khỏi mảng
    renderListNhanVien();
    // Lưu dữ liệu lại
    saveLocalStorage();
  }
}

// Chức năng sửa: done
function getInfoNhanVien(tknv) {
  let item = arrNhanVien.find((item, index) => item.tknv == tknv);
  //   console.log(item);
  let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
  for (field of arrField) {
    let { id } = field;
    field.value = item[id];
    if (id == "tknv") field.disabled = true;
  }
}
// Chức năng cập nhật: done
document.getElementById("btnCapNhat").onclick = function () {
  let nhanVien = getValueForm();
  let index = arrNhanVien.findIndex((item, index) => {
    return item.tknv == nhanVien.tknv;
  });
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    // Cập nhật lại bảng danh sách nhân viên
    renderListNhanVien();
    // Lưu lại dữ liệu
    saveLocalStorage();
  }
};

// Chức năng tìm kiếm (tìm kiếm theo loại nhân viên): done
function searchNhanVien(event) {
  let newKeyWord = removeVietnameseTones(
    event.target.value.toLowerCase().trim()
  );
  //   console.log(newKeyWord);

  let arrSearch = arrNhanVien.filter((item, index) => {
    // vì item không chứa phương thức nên cần tạo một object mới có chứa phương thức
    // sau đó clone dữ liệu từ item
    // loaiNv là một phương thức nên không thể gọi trực tiếp từ item
    let nhanVien = new NhanVien();
    Object.assign(nhanVien, item);
    let newLoaiNv = removeVietnameseTones(
      nhanVien.loaiNv().toLowerCase().trim()
    );
    return newLoaiNv.includes(newKeyWord);
  });
  renderListNhanVien(arrSearch);
}

document.getElementById("searchName").oninput = searchNhanVien;

// Hàm lưu dữ liệu vào Local Storage
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
  let stringJSON = JSON.stringify(value);
  localStorage.setItem(key, stringJSON);
}

// Hàm lấy dữ liệu từ Local Storage
function getLocalStorage(key = "arrNhanVien") {
  let dataLocal = localStorage.getItem(key);
  if (dataLocal) {
    let reverData = JSON.parse(dataLocal);
    arrNhanVien = reverData;
    // Hiển thị danh sách nhân viên ngay khi lấy dữ liệu
    renderListNhanVien();
  }
}

// console.log(arrNhanVien);
