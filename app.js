// ดึงข้อมูลมาจาก EL
const addList_btn = document.getElementById("add-list");
const todo_container = document.getElementById("todo-list");
const input_el = document.getElementById("input-el");

// อีเวนต์
document.addEventListener("DOMContentLoaded", getTodo);
addList_btn.addEventListener("click", saveTodo);

// ฟังชั่น

// บันทึกข้อมูล
function saveTodo() {
  let user_add = input_el.value;
  if (input_el.value === "") {
    Swal.fire({
      icon: "warning",
      title: "อ๊ะ",
      text: "โปรดกรอกรายการ!",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "เรียบร้อย",
      text: "รายการได้รับการอัพเดท",
    });
    let todo_arr;
    if (localStorage.getItem("list") === null) {
      todo_arr = [];
    } else {
      todo_arr = JSON.parse(localStorage.getItem("list"));
    }
    todo_arr.push(user_add);
    localStorage.setItem("list", JSON.stringify(todo_arr));
    input_el.value = "";
    getTodo();
  }
}

// แสดงข้อมูลจากลิสที่บันทึกไว้
function getTodo() {
  let todo_arr;
  if (localStorage.getItem("list") === null) {
    todo_arr = [];
  } else {
    todo_arr = JSON.parse(localStorage.getItem("list"));
  }

  let todo_new = "";
  todo_arr.forEach((item, index) => {
    todo_new += `<div class="todoItem-container">
    <div class="todo_list"><span>${
      index + 1
    }.</span><p>${item}</p></div> <button class="delete-btn" onclick="deleteTodo(event)"><i class="fa-solid fa-trash"></i></button>
    </div>`;
  });
  todo_container.innerHTML = todo_new;
}

function deleteTodo(event) {
  Swal.fire({
    title: "คุณต้องการจะลบใช่ไหม",
    text: "คุณจะไม่สามารถเรียกคืนได้",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("ทำการลบรายการเรียบร้อย");
      let todo_arr;
      if (localStorage.getItem("list") === null) {
        todo_arr = [];
      } else {
        todo_arr = JSON.parse(localStorage.getItem("list"));
      }
      let delete_word =
        event.target.parentNode.children[0].children[1].textContent;
      delete_word = todo_arr.indexOf(delete_word);
      todo_arr.splice(delete_word, 1);
      localStorage.setItem("list", JSON.stringify(todo_arr));
      getTodo();
    }
  });
}
