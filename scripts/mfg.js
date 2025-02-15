document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Manufacturing Engineering Dashboard Loaded");

    // 페이지 이동 함수
    function navigateTo(page) {
        window.location.href = page;
    }

    // 타일/리스트 전환 기능 (요소 존재 여부 확인)
    const tileViewBtn = document.getElementById("tileView");
    const listViewBtn = document.getElementById("listView");
    const tileContainer = document.getElementById("tileContainer");
    const listContainer = document.getElementById("listContainer");

    // 🔹 [추가] 페이지 로드 시 타일 보기 활성화 & 리스트 숨김
    if (tileContainer && listContainer) {
        tileContainer.style.display = "flex";  // 타일 보기를 기본값으로 설정
        listContainer.style.display = "none";  // 리스트 숨김
    }

    if (tileViewBtn && listViewBtn) {
        tileViewBtn.addEventListener("click", function () {
            console.log("📌 타일 보기 선택됨");
            tileContainer.style.display = "flex";  // 타일 컨테이너 표시
            listContainer.style.display = "none";  // 리스트 컨테이너 숨김
            tileViewBtn.classList.add("active");
            listViewBtn.classList.remove("active");
        });

        listViewBtn.addEventListener("click", function () {
            console.log("📋 리스트 보기 선택됨");
            listContainer.style.display = "block";  // 리스트 컨테이너 표시
            tileContainer.style.display = "none";  // 타일 컨테이너 숨김
            listViewBtn.classList.add("active");
            tileViewBtn.classList.remove("active");
        });
    } else {
        console.warn("⚠️ 타일/리스트 전환 버튼 또는 컨테이너가 존재하지 않습니다.");
    }

    // 바로가기 드롭다운 기능
    const dropBtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");

    if (dropBtn && dropdownContent) {
        dropBtn.addEventListener("click", function (event) {
            event.stopPropagation(); // 이벤트 버블링 방지
            dropdownContent.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!dropBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.classList.remove("show");
            }
        });
    }

    // 공정 등록 기능
    const processForm = document.getElementById("processForm");
    if (processForm) {
        processForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const processName = document.getElementById("processName").value;
            const processType = document.getElementById("processType").value;
            const processDesc = document.getElementById("processDesc").value;

            if (processName.trim() === "") {
                alert("공정명을 입력하세요.");
                return;
            }

            alert(`✅ 공정 등록 완료: ${processName} (${processType})`);
            processForm.reset();
        });
    }

    // 공정 리스트 수정 및 삭제 기능
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function () {
            alert("✏️ 공정 수정 기능은 현재 개발 중입니다.");
        });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            row.remove();
            alert("🗑 공정이 삭제되었습니다.");
        });
    });

    window.navigateTo = navigateTo;
});
