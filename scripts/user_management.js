document.addEventListener("DOMContentLoaded", function () {
  console.log("User Management script loaded.");

  const userTable = document.getElementById("userTable");

  // 사용자 데이터 (실제 데이터베이스 연동 없음)
  let users = [
      { id: 1, name: "김철수", role: "Admin", status: "활성" },
      { id: 2, name: "이영희", role: "Quality", status: "비활성" },
      { id: 3, name: "박민수", role: "Production", status: "승인 대기" }
  ];

  function renderUsers() {
      userTable.innerHTML = "";
      users.forEach((user, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td class="border px-4 py-2">${user.id}</td>
              <td class="border px-4 py-2">${user.name}</td>
              <td class="border px-4 py-2">
                  <select class="role-select border p-1" data-index="${index}">
                      <option value="Admin" ${user.role === "Admin" ? "selected" : ""}>Admin (시스템 관리자)</option>
                      <option value="Quality" ${user.role === "Quality" ? "selected" : ""}>Quality (품질 담당자)</option>
                      <option value="Material" ${user.role === "Material" ? "selected" : ""}>Material (자재 담당자)</option>
                      <option value="Production" ${user.role === "Production" ? "selected" : ""}>Production (생산 담당자)</option>
                      <option value="Logistics" ${user.role === "Logistics" ? "selected" : ""}>Logistics (물류 담당자)</option>
                      <option value="Engineer" ${user.role === "Engineer" ? "selected" : ""}>Engineer (생산기술 담당자)</option>
                      <option value="Operator" ${user.role === "Operator" ? "selected" : ""}>Operator (작업자 - 생산 검사)</option>
                      <option value="Customer" ${user.role === "Customer" ? "selected" : ""}>Customer (고객사 담당자)</option>
                  </select>
              </td>
              <td class="border px-4 py-2">${user.status}</td>
              <td class="border px-4 py-2">
                  <button class="approve-btn bg-green-500 text-white px-2 py-1 rounded" data-index="${index}">승인</button>
                  <button class="reject-btn bg-yellow-500 text-white px-2 py-1 rounded" data-index="${index}">반려</button>
                  <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded" data-index="${index}">삭제</button>
              </td>
          `;
          userTable.appendChild(row);
      });

      attachEventListeners();
  }

  function attachEventListeners() {
      // 역할 변경 이벤트
      document.querySelectorAll(".role-select").forEach(select => {
          select.addEventListener("change", function () {
              const index = this.getAttribute("data-index");
              users[index].role = this.value;
              console.log(`사용자 ${users[index].name}의 역할이 ${users[index].role}로 변경되었습니다.`);
          });
      });

      // 승인 버튼 클릭 이벤트
      document.querySelectorAll(".approve-btn").forEach(button => {
          button.addEventListener("click", function () {
              const index = this.getAttribute("data-index");
              users[index].status = "활성";
              alert(`${users[index].name}님의 계정이 승인되었습니다.`);
              renderUsers();
          });
      });

      // 반려 버튼 클릭 이벤트
      document.querySelectorAll(".reject-btn").forEach(button => {
          button.addEventListener("click", function () {
              const index = this.getAttribute("data-index");
              users[index].status = "반려됨";
              alert(`${users[index].name}님의 요청이 반려되었습니다.`);
              renderUsers();
          });
      });

      // 삭제 버튼 클릭 이벤트
      document.querySelectorAll(".delete-btn").forEach(button => {
          button.addEventListener("click", function () {
              const index = this.getAttribute("data-index");
              users.splice(index, 1);
              alert("사용자가 삭제되었습니다.");
              renderUsers();
          });
      });
  }

  renderUsers();
});
