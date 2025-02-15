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
  { partNumber: '50009', itemName: '원자재 E1-1', itemType: '원자재', parent: '30006', children: [], usage: '2개', manufacturer: '롯데화학' },

  // 제품 F (원자재가 다른 제품과 공유됨)
  { partNumber: '10006', itemName: '제품 F', itemType: '제품', parent: null, children: ['30007'], usage: '-', manufacturer: 'GM코리아' },
  { partNumber: '30007', itemName: '부품 F1', itemType: '부품', parent: '10006', children: ['50003'], usage: '2개', manufacturer: '삼성물산' }, // 공유 원자재 사용 (제품 A의 원자재)
  
  // 제품 G (단순한 구조)
  { partNumber: '10007', itemName: '제품 G', itemType: '제품', parent: null, children: ['30008'], usage: '-', manufacturer: '벤츠코리아' },
  { partNumber: '30008', itemName: '부품 G1', itemType: '부품', parent: '10007', children: ['50010'], usage: '1개', manufacturer: 'BMW코리아' },
  { partNumber: '50010', itemName: '원자재 G1-1', itemType: '원자재', parent: '30008', children: [], usage: '3개', manufacturer: '테슬라코리아' },

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

function renderBOMList(data) {
  const tableBody = document.getElementById('bomListBody');
  tableBody.innerHTML = '';  

  data.forEach(bom => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td onclick="viewDetail('${bom.partNumber}')">${bom.partNumber}</td>
          <td onclick="viewDetail('${bom.partNumber}')">${bom.itemName}</td>
          <td>${bom.itemType}</td>
          <td>${bom.parent ? bom.parent : '없음'}</td>
          <td>${bom.usage}</td>
          <td>${bom.manufacturer}</td>
      `;
      tableBody.appendChild(row);
  });
}

function filterBOM() {
  const partNumber = document.getElementById('searchPartNumber').value.toLowerCase();
  const itemName = document.getElementById('searchItemName').value.toLowerCase();
  const manufacturer = document.getElementById('searchManufacturer').value.toLowerCase();

  const filteredData = bomData.filter(bom => {
      return (bom.partNumber.includes(partNumber) &&
              bom.itemName.toLowerCase().includes(itemName) &&
              bom.manufacturer.toLowerCase().includes(manufacturer));
  });

  renderBOMList(filteredData);
}

function viewDetail(partNumber) {
  window.location.href = `bom_detail.html?partNumber=${partNumber}`;
}

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


// 초기 BOM 데이터 로딩
renderBOMList(bomData);