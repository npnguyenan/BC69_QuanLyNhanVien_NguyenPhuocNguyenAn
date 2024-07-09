function checkEmptyValue(value, errorEle) {
  if (value == "") {
    errorEle.innerHTML = "Vui lòng không bỏ trống";
    return false;
  } else {
    errorEle.innerHTML = "";
    return true;
  }
}

// Kiểm tra validation tài khoản tối đa 4 - 6 ký số
function checkTaiKhoan(value, errorEle) {
  let regex = /^^[A-Za-z0-9]{4,6}$/;
  let isValid = regex.test(value);
  if (!isValid) {
    errorEle.innerHTML = "Từ 4-6 ký tự";
  } else {
    errorEle.innerHTML = "";
    return true;
  }
}

// Kiểm tra validation tên phải là chữ
function checkName(value, errorEle) {
  let regex =
    /^[a-zA-Z\sàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]+$/;
  let isValid = regex.test(value);
  if (!isValid) {
    errorEle.innerHTML = "Vui lòng chỉ nhập chữ";
    return false;
  } else {
    errorEle.innerHTML = "";
    return true;
  }
}

// Kiểm tra validation email
function checkEmail(value, errorEle) {
  let regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let isValid = regex.test(value);
  if (!isValid) {
    errorEle.innerHTML = "Vui lòng nhập đúng định dạng email";
    return false;
  } else {
    errorEle.innerHTML = "";
    return true;
  }
}

// Kiểm tra validation password từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)
function checkPassword(value, errorEle) {
  let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  let isValid = regex.test(value);
  if (!isValid) {
    errorEle.innerHTML = "Mật khẩu không hợp lệ";
    return false;
  } else {
    errorEle.innerHTML = "";
    return true;
  }
}

// Kiểm tra validation ngày làm đ/mm/yyyy
function checkDate(value, errorEle) {
  let regex = /^(0[1-9]|[1-2][0-9]|3[0-1])[/](0[1-9]|1[0-2])[/](19|20)\d{2}$/;
  let isValid = regex.test(value);
  if (!isValid) {
    errorEle.innerHTML = "Vui lòng nhập đúng định dạng dd/mm/yyyy";
    return false;
  } else {
    errorEle.innerHTML = "";
    return true;
  }
}

// Kiểm tra validation lương
function checkLuong(value, errorEle) {
  if (value * 1 < 1000000 || value * 1 > 20000000) {
    errorEle.innerHTML = "Lương phải từ 1.000.000-20.000.000";
    return false;
  } else {
    errorEle.innerHTML = "";
    return true;
  }
}

// Kiểm tra validation giờ làm 80-200
function checkGioLam(value, errorEle) {
  if (value * 1 < 80 || value * 1 > 200) {
    errorEle.innerHTML = "Số giờ làm phải từ 80-200";
    return false;
  } else {
    errorEle.innerHTML = "";
    return true;
  }
}

// Kiểm tra validation chức vụ
function checkChucVu(value, errorEle) {
  if (value == "Sếp" || value == "Trưởng phòng" || value == "Nhân viên") {
    errorEle.innerHTML = "";
    return true;
  } else {
    errorEle.innerHTML = "Chức vụ không hợp lệ";
    return false;
  }
}
