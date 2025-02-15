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


// 페이지 로드 시 BOM 정보 가져오기
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const partNumber = urlParams.get("partNumber");

  if (partNumber) {
      loadBOMData(partNumber);
      renderBOMTree(partNumber);
  }
});

function loadBOMDetails(partNumber) {
  // 가상 BOM 데이터에서 해당 BOM 정보 로드
  const selectedBOM = bomData.find(bom => bom.partNumber === partNumber);
  
  if (selectedBOM) {
      document.getElementById("productName").value = selectedBOM.itemName;
      document.getElementById("productNumber").value = selectedBOM.partNumber;
      document.getElementById("itemType").value = selectedBOM.itemType;
      document.getElementById("manufacturer").value = selectedBOM.manufacturer;
  }
}

// 🔹 선택된 BOM 정보를 로드하여 폼에 채움
function loadBOMData(partNumber) {
  const bom = bomData.find(item => item.partNumber === partNumber);
  if (!bom) return;

  document.getElementById("productName").value = bom.itemName;
  document.getElementById("productNumber").value = bom.partNumber;
  document.getElementById("parentItem").value = bom.parent ? bom.parent : "최상위 제품";
  document.getElementById("itemType").value = bom.itemType;
  document.getElementById("partNumber").value = bom.partNumber;
  document.getElementById("itemName").value = bom.itemName;
  document.getElementById("quantity").value = bom.usage === "-" ? "" : bom.usage;
  document.getElementById("manufacturer").value = bom.manufacturer;
}

// 🔹 BOM 수정 저장 버튼 클릭 시 처리
document.getElementById("saveBOM").addEventListener("click", function () {
  const updatedBOM = {
      partNumber: document.getElementById("partNumber").value,
      itemName: document.getElementById("itemName").value,
      itemType: document.getElementById("itemType").value,
      parent: document.getElementById("parentItem").value,
      usage: document.getElementById("quantity").value || "-",
      manufacturer: document.getElementById("manufacturer").value
  };

  console.log("수정된 BOM 데이터:", updatedBOM);
  alert("BOM 수정이 완료되었습니다.");

  // 🔹 BOM 리스트 페이지로 이동
  window.location.href = "bom_list.html";
});

// 🔹 BOM 리스트에서 클릭하면 해당 BOM 수정
function renderBOMTree() {
  const bomTreeView = document.getElementById("bomTreeView");
  bomTreeView.innerHTML = "";

  function buildTree(parentId, parentElement) {
      const children = bomData.filter(item => item.parent === parentId);
      if (children.length === 0) return;

      const ul = document.createElement("ul");
      children.forEach(item => {
          const li = document.createElement("li");
          li.textContent = `${item.itemType} - ${item.itemName} (${item.partNumber})`;
          li.dataset.partNumber = item.partNumber;

          // ✅ BOM 선택 시 하이라이트 효과 추가
          li.addEventListener("click", function () {
              document.querySelectorAll(".bom-tree li").forEach(el => el.classList.remove("selected-bom"));
              li.classList.add("selected-bom");
              loadBOMData(item.partNumber);
          });

          ul.appendChild(li);
          buildTree(item.partNumber, li); // ✅ 재귀적으로 하위 노드 추가
      });

      parentElement.appendChild(ul);
  }

  // ✅ 최상위 제품 찾기 및 트리 그리기
  const rootProducts = bomData.filter(item => item.parent === null);
  rootProducts.forEach(product => {
      const li = document.createElement("li");
      li.textContent = `📦 ${product.itemName} (${product.partNumber})`;
      li.dataset.partNumber = product.partNumber;
      li.classList.add("product-root");

      li.addEventListener("click", function () {
          document.querySelectorAll(".bom-tree li").forEach(el => el.classList.remove("selected-bom"));
          li.classList.add("selected-bom");
          loadBOMData(product.partNumber);
      });

      bomTreeView.appendChild(li);
      buildTree(product.partNumber, li);
  });
}

function renderBOMTree(productPartNumber) {
  const bomTreeView = document.getElementById("bomTreeView");
  bomTreeView.innerHTML = "";

  // ✅ 선택된 제품만 트리 구조 생성
  const selectedProduct = bomData.find(item => item.partNumber === productPartNumber);
  if (!selectedProduct) return;

  function buildTree(parentId, parentElement) {
      const children = bomData.filter(item => item.parent === parentId);
      if (children.length === 0) return;

      const ul = document.createElement("ul");
      children.forEach(item => {
          const li = document.createElement("li");
          li.textContent = `${item.itemType} - ${item.itemName} (${item.partNumber})`;
          li.dataset.partNumber = item.partNumber;

          // ✅ 클릭 이벤트 - 하나의 항목만 선택 유지
          li.addEventListener("click", function (event) {
              event.stopPropagation(); // 부모 요소 이벤트 방지

              // 🔹 기존 선택된 항목을 모두 초기화
              document.querySelectorAll(".bom-tree li").forEach(el => el.classList.remove("selected-bom"));

              // 🔹 현재 클릭한 항목만 하이라이트
              li.classList.add("selected-bom");

              // 🔹 선택한 BOM 데이터를 폼에 로드
              loadBOMData(item.partNumber);
          });

          ul.appendChild(li);
          buildTree(item.partNumber, li); // ✅ 재귀적으로 하위 노드 추가
      });

      parentElement.appendChild(ul);
  }

  // ✅ 선택된 제품을 트리의 루트로 설정
  const li = document.createElement("li");
  li.textContent = `📦 ${selectedProduct.itemName} (${selectedProduct.partNumber})`;
  li.dataset.partNumber = selectedProduct.partNumber;
  li.classList.add("product-root");

  li.addEventListener("click", function (event) {
      event.stopPropagation();

      // 🔹 기존 선택된 항목 해제
      document.querySelectorAll(".bom-tree li").forEach(el => el.classList.remove("selected-bom"));

      // 🔹 현재 클릭한 항목만 선택
      li.classList.add("selected-bom");

      // 🔹 선택한 BOM 데이터를 폼에 로드
      loadBOMData(selectedProduct.partNumber);
  });

  bomTreeView.appendChild(li);
  buildTree(selectedProduct.partNumber, li);
}

// 🔹 드롭다운 메뉴 토글
function toggleDropdown() {
  document.getElementById("quickLinks").classList.toggle("show");
}

// 🔹 드롭다운 외부 클릭 시 자동 닫기
window.onclick = function (event) {
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