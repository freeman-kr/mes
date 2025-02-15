document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ 모델별 공정 순서 페이지 로드됨");

  // 버튼 요소 가져오기
  const searchModelBtn = document.getElementById("searchModel");
  const newModelBtn = document.getElementById("newModel");
  const editModelBtn = document.getElementById("editModel");
  const saveProcessBtn = document.getElementById("saveProcess");

  // 입력 필드 및 결과 테이블 요소 가져오기
  const modelCodeInput = document.getElementById("modelCode");
  const searchResults = document.getElementById("searchResults");
  const modelTable = document.getElementById("modelTable");
  const processSequenceField = document.getElementById("processSequence");
  const processOrderList = document.getElementById("processOrderList");

  // 🔍 모델 검색 버튼 클릭
  if (searchModelBtn) {
      searchModelBtn.addEventListener("click", function () {
          const modelCode = modelCodeInput.value.trim();
          if (modelCode === "") {
              alert("모델 코드를 입력하세요.");
              return;
          }

          if (modelCode === "1234-5678-00") {
              alert(`모델 검색 결과 있음: ${modelCode}`);
              searchResults.classList.remove("hidden");

              modelTable.innerHTML = `
                  <tr>
                      <td>1234-5678-00</td>
                      <td>MQ5</td>
                      <td>MS400A</td>
                      <td>준비1 → 조립1 → 준비2 → 조립2 → 자동검사1 → 자동검사2 → 수동검사1 → 수동검사2 → 포장준비1 → 포장</td>
                      <td>
                          <button id="editModel">✏️ 수정</button>
                      </td>
                  </tr>
              `;

              // 동적으로 생성된 수정 버튼 이벤트 리스너 추가
              document.getElementById("editModel").addEventListener("click", function () {
                  window.location.href = "model_order_edit.html?model=1234-5678-00";
              });
          } else {
              alert("모델을 찾을 수 없습니다. 신규 등록하세요.");
              searchResults.classList.add("hidden");
          }
      });
  }

  // 🆕 신규 등록 버튼 클릭
  if (newModelBtn) {
      newModelBtn.addEventListener("click", function () {
          window.location.href = "model_order_new.html";
      });
  }

  // ✏️ 수정 버튼 클릭
  if (editModelBtn) {
      editModelBtn.addEventListener("click", function () {
          window.location.href = "model_order_edit.html?model=1234-5678-00";
      });
  }

  // 💾 저장 버튼 클릭 (공정 순서 저장)
  if (saveProcessBtn) {
      saveProcessBtn.addEventListener("click", function () {
          alert(`✅ 공정 순서가 저장되었습니다:\n${processSequenceField.value}`);
      });
  }

  // 🔗 바로가기 드롭다운 기능
  const dropBtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (dropBtn && dropdownContent) {
      dropBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          dropdownContent.classList.toggle("show");
      });

      document.addEventListener("click", function (event) {
          if (!dropBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
              dropdownContent.classList.remove("show");
          }
      });
  }

  // ✅ [model_order_edit.html] 공정 순서 등록 관련 코드
  if (document.getElementById("prepProcess")) {
      console.log("📌 공정 순서 등록 활성화됨");

      // 공정 선택 목록
      const processes = {
          준비공정: ["준비1", "준비2", "준비3"],
          조립공정: ["조립1", "조립2", "조립3", "조립4", "조립5"],
          검사공정: ["자동검사1", "자동검사2", "자동검사3", "수동검사1", "수동검사2", "수동검사3", "비젼검사"],
          포장공정: ["포장준비1", "포장준비2", "포장"]
      };

      const prepProcess = document.getElementById("prepProcess");
      const assemblyProcess = document.getElementById("assemblyProcess");
      const inspectionProcess = document.getElementById("inspectionProcess");
      const packagingProcess = document.getElementById("packagingProcess");

      function populateProcessDropdown(selectElement, processList) {
          processList.forEach(process => {
              const option = document.createElement("option");
              option.value = process;
              option.textContent = process;
              selectElement.appendChild(option);
          });
      }

      populateProcessDropdown(prepProcess, processes.준비공정);
      populateProcessDropdown(assemblyProcess, processes.조립공정);
      populateProcessDropdown(inspectionProcess, processes.검사공정);
      populateProcessDropdown(packagingProcess, processes.포장공정);

      function updateProcessOrder() {
          processOrderList.innerHTML = "";
          let selectedProcesses = [
              ...prepProcess.selectedOptions,
              ...assemblyProcess.selectedOptions,
              ...inspectionProcess.selectedOptions,
              ...packagingProcess.selectedOptions
          ].map(option => option.value);

          selectedProcesses.forEach((process, index) => {
              const processItem = document.createElement("div");
              processItem.classList.add("process-item");
              processItem.textContent = `${index + 1}. ${process}`;
              processOrderList.appendChild(processItem);
          });
      }

      prepProcess.addEventListener("change", updateProcessOrder);
      assemblyProcess.addEventListener("change", updateProcessOrder);
      inspectionProcess.addEventListener("change", updateProcessOrder);
      packagingProcess.addEventListener("change", updateProcessOrder);
  }
});
