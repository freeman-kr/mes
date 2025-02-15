document.addEventListener("DOMContentLoaded", function () {
  const tileViewBtn = document.getElementById("tileView");
  const listViewBtn = document.getElementById("listView");
  const tileContainer = document.getElementById("tileContainer");
  const listContainer = document.getElementById("listContainer");
  const packingTableBody = document.getElementById("packingTableBody");

  let packingData = [
      { modelName: "Model A", cartonQuantity: 10, packingAccessories: "에어캡", palletLayers: 5 },
      { modelName: "Model B", cartonQuantity: 8, packingAccessories: "완충재", palletLayers: 3 }
  ];

  // 🔹 타일/리스트 전환 기능
  tileViewBtn.addEventListener("click", function () {
      tileContainer.classList.remove("hidden");
      listContainer.classList.add("hidden");
      tileViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
  });

  listViewBtn.addEventListener("click", function () {
      tileContainer.classList.add("hidden");
      listContainer.classList.remove("hidden");
      listViewBtn.classList.add("active");
      tileViewBtn.classList.remove("active");
      updatePackingTable();
  });

  // 🔹 포장 사양 리스트 업데이트
  function updatePackingTable() {
      packingTableBody.innerHTML = "";

      packingData.forEach((item, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${item.modelName}</td>
              <td>${item.cartonQuantity}</td>
              <td>${item.packingAccessories}</td>
              <td>${item.palletLayers}</td>
              <td>
                  <button class="edit-btn" onclick="editPacking(${index})">✏️ 수정</button>
                  <button class="delete-btn" onclick="deletePacking(${index})">❌ 삭제</button>
              </td>
          `;
          packingTableBody.appendChild(row);
      });
  }

  // 🔹 페이지 이동 기능
  window.navigateTo = function (page) {
      window.location.href = page;
  };

  // 🔹 포장 사양 삭제 기능
  window.deletePacking = function (index) {
      if (confirm("해당 포장 사양을 삭제하시겠습니까?")) {
          packingData.splice(index, 1);
          updatePackingTable();
      }
  };

  // 🔹 포장 사양 수정 기능
  window.editPacking = function (index) {
      alert(`"${packingData[index].modelName}" 사양을 수정합니다.`);
  };
});
