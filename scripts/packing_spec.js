// 📦 가상 BOM 데이터
const fakeBOM = {
    Products: [
        { materialNumber: "P001", name: "AVN 시스템" },
        { materialNumber: "P002", name: "디지털 클러스터" },
        { materialNumber: "P003", name: "HUD 시스템" }
    ],
    CartonBoxes: [
        { materialNumber: "CBX-1001", name: "소형 카톤박스" },
        { materialNumber: "CBX-2001", name: "중형 카톤박스" },
        { materialNumber: "CBX-3001", name: "대형 카톤박스" }
    ]
};

// 📍 제품 검색
function handleSearch() {
    const input = document.getElementById("searchInput").value.trim();
    const results = document.getElementById("searchResults");
    results.innerHTML = "";

    if (!input) {
        alert("📢 검색어를 입력해 주세요!");
        return;
    }

    const filteredProducts = fakeBOM.Products.filter(p => 
        p.materialNumber.includes(input) || p.name.includes(input)
    );

    if (filteredProducts.length === 0) {
        results.innerHTML = "<tr><td colspan='2'>검색 결과 없음</td></tr>";
        return;
    }

    filteredProducts.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${p.materialNumber}</td><td>${p.name}</td>`;
        row.addEventListener("dblclick", () => selectProduct(p.materialNumber));
        results.appendChild(row);
    });
}

// ✅ 제품 선택
function selectProduct(materialNumber) {
    document.getElementById("selectedProduct").textContent = materialNumber;
    document.getElementById("nextBtn").style.display = "block";
}

// 📦 다음 단계 (카톤박스 검색)
function goToNextStep() {
    document.getElementById("questionLabel").textContent = "📦 카톤박스를 검색하세요";
    document.getElementById("searchInput").value = "";
    document.getElementById("searchInput").placeholder = "카톤박스 번호 또는 이름";
    document.getElementById("searchResults").innerHTML = "";
    
    document.getElementById("nextBtn").style.display = "none";

    document.getElementById("searchInput").setAttribute("onkeyup", "searchCartonBox()");
}

// 🔍 카톤박스 검색
function searchCartonBox() {
    const input = document.getElementById("searchInput").value.trim();
    const results = document.getElementById("searchResults");
    results.innerHTML = "";

    if (!input) return;

    const filteredBoxes = fakeBOM.CartonBoxes.filter(cb => 
        cb.materialNumber.includes(input) || cb.name.includes(input)
    );

    filteredBoxes.forEach(cb => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${cb.materialNumber}</td><td>${cb.name}</td>`;
        row.addEventListener("dblclick", () => {
            document.getElementById("selectedCartonBox").textContent = cb.materialNumber;
        });
        results.appendChild(row);
    });
}
