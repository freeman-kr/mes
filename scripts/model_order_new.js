document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ 모델별 공정 순서 등록 페이지 로드됨");

  // 요소 선택
  const modelCodeInput = document.getElementById("modelCode");
  const modelSaveBtn = document.getElementById("modelSaveBtn");
  const modelStatusLabel = document.getElementById("modelStatusLabel");
  const processInputBtn = document.getElementById("processInputBtn");
  const processOrderList = document.getElementById("processOrderList");
  const packagingProcess = document.getElementById("packagingProcess");

  // ✅ (2025-02-10) 바로가기 버튼 동작 복원
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

  // ✅ (2025-02-11) 모델 코드 입력 후 검색 라벨 변경 및 모델 저장 버튼 활성화
  if (modelCodeInput) {
      modelCodeInput.addEventListener("blur", function () {
          modelStatusLabel.textContent = "🔍 검색중...";
          modelStatusLabel.style.color = "orange";
          modelSaveBtn.disabled = true;

          setTimeout(() => {
              modelStatusLabel.textContent = "✅ 등록 가능";
              modelStatusLabel.style.color = "green";
              modelSaveBtn.disabled = false;
          }, 1000);
      });
  }

  // ✅ (2025-02-11) 모델 저장 버튼 클릭 시 "저장 완료" 팝업 추가 및 색상 변경
  if (modelSaveBtn) {
      modelSaveBtn.addEventListener("click", function () {
          alert(`✅ 모델 코드 ${modelCodeInput.value} 저장 완료`);
          modelSaveBtn.style.backgroundColor = "#007bff"; // 파란색 변경
          modelSaveBtn.style.color = "white";
      });
  }

  // ✅ (2025-02-11) 공정 선택 목록 복구 및 크기 조정
  const processes = {
      준비공정: ["준비1", "준비2", "준비3"],
      조립공정: ["조립1", "조립2", "조립3", "조립4", "조립5"],
      검사공정: ["자동검사1", "자동검사2", "자동검사3", "수동검사1", "수동검사2", "수동검사3", "비젼검사"],
      포장공정: ["포장준비1", "포장준비2", "포장"]
  };

  function populateProcessDropdown(selectElement, processList) {
      if (!selectElement) return;
      selectElement.innerHTML = "";
      processList.forEach(process => {
          const option = document.createElement("option");
          option.value = process;
          option.textContent = process;
          selectElement.appendChild(option);
      });
  }

  populateProcessDropdown(document.getElementById("prepProcess"), processes.준비공정);
  populateProcessDropdown(document.getElementById("assemblyProcess"), processes.조립공정);
  populateProcessDropdown(document.getElementById("inspectionProcess"), processes.검사공정);
  populateProcessDropdown(packagingProcess, processes.포장공정);

  // ✅ (2025-02-11) 포장공정 선택 시 공정 입력 버튼 활성화
  if (packagingProcess) {
      packagingProcess.addEventListener("change", function () {
          processInputBtn.disabled = false;
          processInputBtn.classList.add("active-button");
          processInputBtn.style.backgroundColor = "#007bff";
          processInputBtn.style.color = "white";
          processInputBtn.textContent = "✔ 공정 입력";
      });
  }

  // ✅ (2025-02-11) 공정 순서 지정에서 드래그 & 드롭 기능 개선
  function updateProcessOrder() {
      processOrderList.innerHTML = "";
      let selectedProcesses = [
          ...document.getElementById("prepProcess").selectedOptions,
          ...document.getElementById("assemblyProcess").selectedOptions,
          ...document.getElementById("inspectionProcess").selectedOptions,
          ...packagingProcess.selectedOptions
      ].map(option => option.value);

      selectedProcesses.forEach((process, index) => {
          const processItem = document.createElement("div");
          processItem.classList.add("process-item");
          processItem.innerHTML = `<span class="process-number">${index + 1}</span><span class="process-name">${process}</span>`;
          processItem.draggable = true;
          processItem.dataset.index = index + 1;
          processItem.addEventListener("dragstart", handleDragStart);
          processItem.addEventListener("dragover", handleDragOver);
          processItem.addEventListener("drop", handleDrop);
          processOrderList.appendChild(processItem);
      });

      alert("✅ 공정이 입력되었습니다. 순서를 드래그하여 조정하세요.");
  }

  if (processInputBtn) {
      processInputBtn.addEventListener("click", updateProcessOrder);
  }

  // ✅ (2025-02-11) 드래그 & 드롭 개선: 드롭 위치 강조, 화살표 추가
  let draggedItem = null;
  let placeholder = null;

  // ✅ (2025-02-11 16:30) 드래그 가능한 공정 카드 생성
  function createProcessCard(name) {
    const card = document.createElement("div");
    card.classList.add("process-item");
    card.textContent = name;
    card.draggable = true;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-process");
    removeBtn.addEventListener("click", () => moveToQueue(card));

    card.appendChild(removeBtn);
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragover", handleDragOver);
    card.addEventListener("drop", handleDrop);

    return card;
  }

  // ✅ (2025-02-11 16:32) 공정을 대기열로 되돌리기
  function moveToQueue(card) {
    processQueue.appendChild(card);
    card.querySelector(".remove-process").remove();
  }


  // ✅ (2025-02-11 16:35) 드래그 시작
  function handleDragStart(event) {
    draggedItem = event.target;
    draggedItem.classList.add("dragging");

    createPlaceholder();
  }


  // ✅ (2025-02-11 16:38) 드래그 중 삽입 위치 가이드 표시
  function handleDragOver(event) {
    event.preventDefault();
    const afterElement = getDragAfterElement(processOrderList, event.clientY);

    if (afterElement == null) {
      processOrderList.appendChild(placeholder);
    } else {
      processOrderList.insertBefore(placeholder, afterElement);
    }
  }

  // ✅ (2025-02-11 16:40) 드래그한 공정을 드롭하면 해당 위치에 삽입
  function handleDrop(event) {
    event.preventDefault();
    draggedItem.classList.remove("dragging");

    if (placeholder) {
      processOrderList.insertBefore(draggedItem, placeholder);
      placeholder.remove();
    }

    updateProcessOrderNumbers();
    draggedItem = null;
  }

// ✅ (2025-02-11 16:42) 점선 삽입 위치(placeholder) 생성
function createPlaceholder() {
  placeholder = document.createElement("div");
  placeholder.classList.add("process-placeholder");
  placeholder.textContent = "📍 여기에 공정 추가";
}

// ✅ (2025-02-11 16:45) 공정 번호 업데이트
function updateProcessOrderNumbers() {
  const items = processOrderList.querySelectorAll(".process-item");
  items.forEach((item, index) => {
    item.dataset.index = index + 1;
  });
}

 // ✅ (2025-02-11 16:47) 드래그 위치 감지 후 적절한 삽입 위치 찾기
 function getDragAfterElement(container, y) {
  const elements = [...container.querySelectorAll(".process-item:not(.dragging)")];

  return elements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    return offset < 0 && offset > closest.offset ? { offset, element: child } : closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

 // ✅ (2025-02-11 16:50) 공정 입력 버튼 클릭 시 공정 생성
 processInputBtn.addEventListener("click", () => {
  const newProcess = createProcessCard("새 공정");
  processQueue.appendChild(newProcess);
});


});
