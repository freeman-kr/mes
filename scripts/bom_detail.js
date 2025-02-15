// BOM 데이터 (사용자가 제공한 데이터)
const bomData = [
  // 제품 A (기본 제품)
  { partNumber: '10001', itemName: '제품 A', itemType: '제품', parent: null, children: ['30001', '30002'], usage: '-', manufacturer: '현대모비스' },
  { partNumber: '30001', itemName: '부품 A1', itemType: '부품', parent: '10001', children: ['50001', '50002'], usage: '2개', manufacturer: '삼성전자' },
  { partNumber: '50001', itemName: '원자재 A1-1', itemType: '원자재', parent: '30001', children: [], usage: '5개', manufacturer: 'LG화학' },
  { partNumber: '50002', itemName: '원자재 A1-2', itemType: '원자재', parent: '30001', children: [], usage: '3개', manufacturer: 'SK이노베이션' },
  { partNumber: '30002', itemName: '부품 A2', itemType: '부품', parent: '10001', children: ['50003'], usage: '1개', manufacturer: '한화테크' },
  { partNumber: '50003', itemName: '원자재 A2-1', itemType: '원자재', parent: '30002', children: [], usage: '4개', manufacturer: '포스코' },

  // 제품 B (공유 원자재 사용)
  { partNumber: '10002', itemName: '제품 B', itemType: '제품', parent: null, children: ['30003'], usage: '-', manufacturer: '현대자동차' },
  { partNumber: '30003', itemName: '부품 B1', itemType: '부품', parent: '10002', children: ['50001', '50004'], usage: '3개', manufacturer: '삼성SDI' }, // 공유 원자재 사용
  { partNumber: '50004', itemName: '원자재 B1-1', itemType: '원자재', parent: '30003', children: [], usage: '2개', manufacturer: 'LG디스플레이' },

  // 제품 C (여러 제품과 공유된 원자재)
  { partNumber: '10003', itemName: '제품 C', itemType: '제품', parent: null, children: ['30004'], usage: '-', manufacturer: '기아자동차' },
  { partNumber: '30004', itemName: '부품 C1', itemType: '부품', parent: '10003', children: ['50001', '50005'], usage: '2개', manufacturer: 'LG전자' }, // 공유 원자재 사용
  { partNumber: '50003', itemName: '원자재 A2-1', itemType: '원자재', parent: '30004', children: [], usage: '3개', manufacturer: '삼성SDI' },

  // 제품 D (하위 계층 구조가 깊은 BOM)
  { partNumber: '10004', itemName: '제품 D', itemType: '제품', parent: null, children: ['30005'], usage: '-', manufacturer: '르노삼성' },
  { partNumber: '30005', itemName: '부품 D1', itemType: '부품', parent: '10004', children: ['50006', '50007'], usage: '1개', manufacturer: 'SK온' },
  { partNumber: '50006', itemName: '원자재 D1-1', itemType: '원자재', parent: '30005', children: ['50008'], usage: '4개', manufacturer: '삼성전기' },
  { partNumber: '50007', itemName: '원자재 D1-2', itemType: '원자재', parent: '30005', children: [], usage: '2개', manufacturer: 'LG이노텍' },
  { partNumber: '50003', itemName: '원자재 A2-1', itemType: '원자재', parent: '50006', children: [], usage: '1개', manufacturer: '포스코케미칼' },

  // 제품 E (다른 제품의 부품을 포함하는 구조)
  { partNumber: '10005', itemName: '제품 E', itemType: '제품', parent: null, children: ['30006', '10002'], usage: '-', manufacturer: '쌍용자동차' }, // 제품 B 포함
  { partNumber: '30006', itemName: '부품 E1', itemType: '부품', parent: '10005', children: ['50009'], usage: '1개', manufacturer: '현대글로비스' },
  { partNumber: '50004', itemName: '원자재 E1-1', itemType: '원자재', parent: '30006', children: [], usage: '2개', manufacturer: '롯데화학' },

  // 제품 F (원자재가 다른 제품과 공유됨)
  { partNumber: '10006', itemName: '제품 F', itemType: '제품', parent: null, children: ['30007'], usage: '-', manufacturer: 'GM코리아' },
  { partNumber: '30007', itemName: '부품 F1', itemType: '부품', parent: '10006', children: ['50003'], usage: '2개', manufacturer: '삼성물산' }, // 공유 원자재 사용 (제품 A의 원자재)
  
  // 제품 G (단순한 구조)
  { partNumber: '10007', itemName: '제품 G', itemType: '제품', parent: null, children: ['30008'], usage: '-', manufacturer: '벤츠코리아' },
  { partNumber: '30008', itemName: '부품 G1', itemType: '부품', parent: '10007', children: ['50010'], usage: '1개', manufacturer: 'BMW코리아' },
  { partNumber: '50004', itemName: '원자재 G1-1', itemType: '원자재', parent: '30008', children: [], usage: '3개', manufacturer: '테슬라코리아' },

  // 제품 H (하위 부품이 많은 구조)
  { partNumber: '10008', itemName: '제품 H', itemType: '제품', parent: null, children: ['30009', '30010', '30011'], usage: '-', manufacturer: '볼보코리아' },
  { partNumber: '30009', itemName: '부품 H1', itemType: '부품', parent: '10008', children: ['50011'], usage: '1개', manufacturer: '혼다코리아' },
  { partNumber: '30010', itemName: '부품 H2', itemType: '부품', parent: '10008', children: ['50012'], usage: '2개', manufacturer: '도요타코리아' },
  { partNumber: '30011', itemName: '부품 H3', itemType: '부품', parent: '10008', children: ['50013'], usage: '3개', manufacturer: '아우디코리아' },
  
  // 제품 I (독립적인 원자재 구조)
  { partNumber: '10009', itemName: '제품 I', itemType: '제품', parent: null, children: ['30012'], usage: '-', manufacturer: '포드코리아' },
  { partNumber: '30012', itemName: '부품 I1', itemType: '부품', parent: '10009', children: ['50014'], usage: '1개', manufacturer: '닛산코리아' },
  { partNumber: '50014', itemName: '원자재 I1-1', itemType: '원자재', parent: '30012', children: [], usage: '2개', manufacturer: '마쯔다코리아' }
];

// 🔹 페이지 로드 시 BOM 정보 가져오기
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const partNumber = urlParams.get("partNumber");

    if (partNumber) {
        displayBOMDetail(partNumber);
    }
});

// 🔹 BOM 상세 정보 표시
function displayBOMDetail(partNumber) {
  const bom = bomData.find(item => item.partNumber === partNumber);
  if (!bom) return;

  document.getElementById("bomTitle").textContent = `📦 ${bom.itemName} (${bom.partNumber})`;
  document.getElementById("bomPartNumber").textContent = bom.partNumber;
  document.getElementById("bomItemName").textContent = bom.itemName;
  document.getElementById("bomItemType").textContent = bom.itemType;
  document.getElementById("bomManufacturer").textContent = bom.manufacturer;
  document.getElementById("bomUsage").textContent = bom.usage;

  populateProductSelect(partNumber);
}

// 🔹 선택된 BOM이 포함된 제품만 드롭박스에 추가
function populateProductSelect(partNumber) {
  const productSelect = document.getElementById("productSelect");
  productSelect.innerHTML = ""; // 기존 옵션 제거

  // 🔹 선택한 BOM이 속한 모든 제품 찾기
  const usedProducts = findAllParentProducts(partNumber);

  if (usedProducts.length === 0) {
      // 사용 제품이 없을 경우 기본 메시지 추가
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "사용된 제품 없음";
      productSelect.appendChild(option);
      return;
  }

  // 🔹 사용된 제품만 드롭박스에 추가
  usedProducts.forEach(product => {
      const option = document.createElement("option");
      option.value = product.partNumber;
      option.textContent = `${product.itemName} (${product.partNumber})`;
      productSelect.appendChild(option);
  });

  // 🔹 기본 선택값 설정 후 트리 생성
  productSelect.value = usedProducts[0].partNumber;
  renderBOMTree(usedProducts[0].partNumber);
}

// 🔹 특정 BOM(부품 또는 원자재)을 포함하는 모든 최상위 제품 찾기
function findAllParentProducts(targetPartNumber) {
  let parentProducts = new Set();

  function findParent(itemNumber) {
      // 🔹 BOM의 상위 항목(부모)을 찾음 (부품 또는 제품)
      const parentItems = bomData.filter(item => item.children.includes(itemNumber));

      parentItems.forEach(parentItem => {
          if (parentItem.itemType === "제품") {
              parentProducts.add(parentItem); // ✅ 제품이면 최상위 제품 목록에 추가
          } else {
              findParent(parentItem.partNumber); // ✅ 계속 부모를 찾아 올라감
          }
      });
  }

  findParent(targetPartNumber);
  return Array.from(parentProducts); // ✅ 중복 제거 후 반환
}

// 🔹 특정 BOM이 제품에 포함되어 있는지 확인하는 함수
function isBOMUsedInProduct(productPartNumber, targetPartNumber) {
  const product = bomData.find(item => item.partNumber === productPartNumber);
  if (!product) return false;

  // 하위 부품/원자재 목록에서 대상 BOM을 찾음
  return product.children.some(child => child === targetPartNumber || isBOMUsedInProduct(child, targetPartNumber));
}


// 🔹 특정 BOM이 선택된 자재의 하위인지 확인하는 함수
function isChildOf(childPartNumber, targetPartNumber) {
  if (childPartNumber === targetPartNumber) return true;
  const childItem = bomData.find(item => item.partNumber === childPartNumber);
  if (!childItem) return false;
  return childItem.children.some(child => isChildOf(child, targetPartNumber));
}

// 🔹 선택된 BOM이 포함된 제품만 드롭박스에 추가
function populateProductSelect(partNumber) {
  const productSelect = document.getElementById("productSelect");
  productSelect.innerHTML = ""; // 기존 옵션 제거

  // 🔹 선택한 BOM이 속한 모든 제품 찾기
  const usedProducts = findAllParentProducts(partNumber); 

  if (usedProducts.length === 0) {
      // 사용 제품이 없을 경우 기본 메시지 추가
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "사용된 제품 없음";
      productSelect.appendChild(option);
      return;
  }

  // 🔹 사용된 제품만 드롭박스에 추가
  usedProducts.forEach(product => {
      const option = document.createElement("option");
      option.value = product.partNumber;
      option.textContent = `${product.itemName} (${product.partNumber})`;
      productSelect.appendChild(option);
  });

  // 🔹 기본 선택값 설정 후 트리 생성
  productSelect.value = usedProducts[0].partNumber;
  renderBOMTree(usedProducts[0].partNumber);
}

// 🔹 선택된 BOM 강조 (하이라이트)
function highlightSelectedBOM(selectedElement) {
  document.querySelectorAll("#bomTree li").forEach(li => li.classList.remove("selected-bom"));
  if (selectedElement) {
      selectedElement.classList.add("selected-bom");
      selectedElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// 🔹 BOM 트리 렌더링 (제품 → 부품 → 원자재 순 출력)
function renderBOMTree(productPartNumber) {
  const treeContainer = document.getElementById("bomTree");
  treeContainer.innerHTML = "";

  // 🔹 최상위 제품 찾기
  const rootProduct = bomData.find(item => item.partNumber === productPartNumber && item.itemType === "제품");
  if (!rootProduct) return;

  function createTreeNode(bomItem, parentElement) {
      const li = document.createElement("li");
      li.textContent = `${bomItem.itemName} (${bomItem.partNumber})`;
      li.dataset.partNumber = bomItem.partNumber;

      li.addEventListener("click", function (event) {
          event.stopPropagation();
          highlightSelectedBOM(li);
      });

      parentElement.appendChild(li);

      // 🔹 하위 부품 및 원자재 출력 (재귀적으로 호출)
      if (bomItem.children.length > 0) {
          const ul = document.createElement("ul");
          bomItem.children.forEach(childPartNumber => {
              const childItem = bomData.find(item => item.partNumber === childPartNumber);
              if (childItem) createTreeNode(childItem, ul);
          });
          li.appendChild(ul);
      }
  }

  // 🔹 제품을 최상위 노드로 출력
  const rootUl = document.createElement("ul");
  createTreeNode(rootProduct, rootUl);
  treeContainer.appendChild(rootUl);
}

// 🔹 드롭박스에서 제품 선택 시 수정 버튼 활성화
document.getElementById("productSelect").addEventListener("change", function () {
  const selectedProductPartNumber = this.value;
  renderBOMTree(selectedProductPartNumber);
});

// 🔹 수정 버튼 클릭 시 `bom_edit.html`로 이동
document.getElementById("editBOMBtn").addEventListener("click", function () {
  const selectedProductPartNumber = document.getElementById("productSelect").value;
  if (selectedProductPartNumber) {
      window.location.href = `bom_edit.html?partNumber=${selectedProductPartNumber}`;
  }
});

function toggleDropdown() {
  document.getElementById("quickLinks").classList.toggle("show");
}

// 드롭다운 외부 클릭 시 자동 닫기
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
          let openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
              openDropdown.classList.remove("show");
          }
      }
  }
};