document.addEventListener("DOMContentLoaded", function () {
    const bomTableBody = document.querySelector("#bomProcessTable tbody");
    const registerButton = document.getElementById("registerProcess");

    // 🔹 BOM 데이터 (예제)
    const bomData = [
        { level: 0, name: "제품 A", number: "10001", quantity: 1 },
        { level: 1, name: "부품 A1", number: "30001", quantity: 1 },
        { level: 2, name: "원자재 A1-1", number: "50001", quantity: 2 },
        { level: 2, name: "원자재 A1-2", number: "50002", quantity: 3 },
        { level: 1, name: "부품 A2", number: "30002", quantity: 1 },
        { level: 2, name: "원자재 A2-1", number: "50003", quantity: 3 },
        { level: 1, name: "매뉴얼", number: "60001", quantity: 1 },
        { level: 1, name: "액세서리", number: "60002", quantity: 1 }
    ];

    // 🔹 LEVEL 기반 들여쓰기
    function getIndentation(level) {
        if (level === 1) return "└ ";
        if (level === 2) return "└─ ";
        return "";
    }

    function renderTable() {
        bomTableBody.innerHTML = "";
        bomData.forEach(item => {
            const row = document.createElement("tr");
            row.classList.add(`level-${item.level}`); // LEVEL별 스타일 적용

            row.innerHTML = `
                <td>${item.level}</td>
                <td class="bom-name">${getIndentation(item.level)}${item.name}</td>
                <td class="bom-number">${item.number}</td>
                <td>${item.quantity}</td>
                ${Array(10).fill('<td><input type="checkbox" class="process-checkbox"></td>').join("")}
            `;
            bomTableBody.appendChild(row);
        });
    }

    function validateAndRegisterProcess() {
        const rows = document.querySelectorAll("#bomProcessTable tbody tr");
        let missingProcesses = [];
        let missingMaterials = [];
        let checkedProcesses = new Set(); // 공정별 체크 확인용

        rows.forEach(row => {
            const checkboxes = row.querySelectorAll(".process-checkbox");
            const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
            
            if (!isChecked) {
                missingProcesses.push(row.cells[1].innerText);
            } else {
                // 체크된 공정 저장
                checkboxes.forEach((checkbox, index) => {
                    if (checkbox.checked) {
                        checkedProcesses.add(index);
                    }
                });
            }
        });

        // 🔹 각 공정에 최소한 하나 이상의 항목이 체크되었는지 확인
        const processCount = document.querySelectorAll("#bomProcessTable thead th").length - 4; // LEVEL, 부품명, 자재번호, 수량 제외
        for (let i = 0; i < processCount; i++) {
            if (!checkedProcesses.has(i)) {
                missingMaterials.push(document.querySelectorAll("#bomProcessTable thead th")[i + 4].innerText);
            }
        }

        if (missingProcesses.length > 0 || missingMaterials.length > 0) {
            let message = "⚠️ 등록 오류가 발견되었습니다:\n";
            if (missingProcesses.length > 0) {
                message += "❌ 공정이 선택되지 않은 자재:\n - " + missingProcesses.join("\n - ") + "\n";
            }
            if (missingMaterials.length > 0) {
                message += "❌ 자재가 포함되지 않은 공정:\n - " + missingMaterials.join("\n - ");
            }
            alert(message);
        } else {
            alert("✅ 공정-부품 등록이 완료되었습니다.");
        }
    }

    renderTable();
    registerButton.addEventListener("click", validateAndRegisterProcess);
});
