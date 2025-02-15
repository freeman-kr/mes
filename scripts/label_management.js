document.addEventListener("DOMContentLoaded", function () {
  const materialNumberInput = document.getElementById("materialNumber");
  const productNameInput = document.getElementById("productName");
  const countryInput = document.getElementById("country");
  const labelTemplateInput = document.getElementById("labelTemplate");
  const registerLabelBtn = document.getElementById("registerLabel");
  const labelTableBody = document.getElementById("labelTableBody");

  let labelData = [];

  registerLabelBtn.addEventListener("click", function () {
      const materialNumber = materialNumberInput.value.trim();
      const productName = productNameInput.value.trim();
      const country = countryInput.value.trim();
      const labelTemplate = labelTemplateInput.value.trim();

      if (!materialNumber || !productName || !country || !labelTemplate) {
          alert("모든 정보를 입력해주세요.");
          return;
      }

      labelData.push({ materialNumber, productName, country, labelTemplate });
      updateLabelTable();
      clearInputs();
  });

  function updateLabelTable() {
      labelTableBody.innerHTML = "";
      labelData.forEach((item, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${item.materialNumber}</td>
              <td>${item.productName}</td>
              <td>${item.country}</td>
              <td>${item.labelTemplate}</td>
              <td>
                  <button class="print-btn" onclick="printLabel('${item.labelTemplate}')">🖨️ 인쇄</button>
                  <button class="delete-btn" onclick="deleteLabel(${index})">❌ 삭제</button>
              </td>
          `;
          labelTableBody.appendChild(row);
      });
  }

  function clearInputs() {
      materialNumberInput.value = "";
      productNameInput.value = "";
      countryInput.value = "";
      labelTemplateInput.value = "";
  }

  window.deleteLabel = function (index) {
      labelData.splice(index, 1);
      updateLabelTable();
  };

  window.printLabel = function (labelTemplate) {
      window.open(`../../labels/${labelTemplate}`, "_blank");
  };
});
