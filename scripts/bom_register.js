document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productRegistration");
  const subItemForm = document.getElementById("subItemRegistration");
  const productSelect = document.getElementById("parentItem");
  const productNameInput = document.getElementById("productName");
  const productNumberInput = document.getElementById("productNumber");
  const registerProductBtn = document.getElementById("registerProduct");
  const registerBOMBtn = document.getElementById("addBOM");
  const bomTreeView = document.getElementById("bomTreeView");

  let bomData = [];

  // 🔹 제품 등록 이벤트
  registerProductBtn.addEventListener("click", function () {
      const productName = productNameInput.value.trim();
      const productNumber = productNumberInput.value.trim();

      if (!productName || !productNumber) {
          alert("제품명과 제품 번호를 입력하세요.");
          return;
      }

      // 제품을 최상위 노드로 추가
      bomData.push({
          partNumber: productNumber,
          name: productName,
          type: "제품",
          parent: null,
          children: []
      });

      updateProductDropdown();
      renderBOMTree();

      // 제품 등록 폼 숨기고, 하위 항목 폼 표시
      productForm.classList.add("hidden");
      subItemForm.classList.remove("hidden");
  });

  // 🔹 제품 드롭다운 업데이트
  function updateProductDropdown() {
      productSelect.innerHTML = '<option value="">부모 선택</option>';
      bomData.forEach(product => {
          productSelect.innerHTML += `<option value="${product.partNumber}">${product.name}</option>`;
      });
  }

  function updateParentSelection() {
    productSelect.innerHTML = '<option value="">부모 선택</option>';
    
    function addOptions(items, prefix = "") {
        items.forEach(item => {
            if (item.type !== "원자재") { // 🔹 원자재는 부모가 될 수 없음
                productSelect.innerHTML += `<option value="${item.partNumber}">${prefix}${item.name}</option>`;
                if (item.children.length > 0) {
                    addOptions(item.children, `${prefix}➥ `); // 계층구조 표현
                }
            }
        });
    }

    addOptions(bomData);
}

  // 🔹 BOM 항목 추가 이벤트
  registerBOMBtn.addEventListener("click", function () {
    const parentPartNumber = productSelect.value;
    const partNumber = document.getElementById("partNumber").value;
    const itemName = document.getElementById("itemName").value;
    const itemType = document.getElementById("itemType").value;

    if (!parentPartNumber || !partNumber || !itemName) {
        alert("부모 항목, 자재번호, 항목명을 입력하세요.");
        return;
    }

    let parent = findBOMItem(bomData, parentPartNumber);

    if (!parent) {
        alert("부모 항목을 찾을 수 없습니다!");
        return;
    }

    // 🔹 원자재는 부품이나 제품 아래에만 등록 가능
    if (itemType === "원자재" && parent.type === "원자재") {
        alert("원자재는 원자재 아래에 등록할 수 없습니다.");
        return;
    }

    parent.children.push({
        partNumber,
        name: itemName,
        type: itemType,
        parent: parentPartNumber,
        children: []
    });

    updateParentSelection();
    renderBOMTree();
});

  // 🔹 BOM 항목을 찾는 함수 (재귀적 탐색)
function findBOMItem(items, partNumber) {
  for (let item of items) {
      if (item.partNumber === partNumber) return item;
      let found = findBOMItem(item.children, partNumber);
      if (found) return found;
  }
  return null;
}

  // ✅ 바로가기 드롭다운 오류 수정
  function toggleDropdown() {
    const dropdown = document.getElementById("quickLinks");
    dropdown.classList.toggle("show");
}

document.querySelector(".dropbtn").addEventListener("click", toggleDropdown);
  // 🔹 BOM 트리 렌더링 함수
  function renderBOMTree() {
    bomTreeView.innerHTML = ""; // 기존 트리 초기화
    const ul = document.createElement("ul");

    function buildTree(items, parentElement) {
        items.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `${item.type} - ${item.name} (<small>${item.partNumber}</small>)`;

            if (item.children.length > 0) {
                const childUl = document.createElement("ul");
                buildTree(item.children, childUl);
                li.appendChild(childUl);
            }

            parentElement.appendChild(li);
        });
    }

    buildTree(bomData, ul);
    bomTreeView.appendChild(ul);
}
});
