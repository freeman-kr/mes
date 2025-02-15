document.addEventListener("DOMContentLoaded", function () {
    console.log("Sidebar script loaded successfully.");

    let activeMenu = null; // 현재 활성화된 메뉴 추적
    let activeLink = null; // 현재 활성화된 링크 추적

    // 초기 로딩 시 모든 서브메뉴 숨김
    document.querySelectorAll(".hidden").forEach(menu => {
        menu.classList.add("hidden");
    });

    function toggleMenu(id) {
        const menu = document.getElementById(id);

        if (menu) {
            if (activeMenu && activeMenu !== menu) {
                activeMenu.classList.add("hidden"); // 기존 메뉴 닫기
            }

            menu.classList.toggle("hidden"); // 현재 메뉴 열기/닫기
            activeMenu = menu.classList.contains("hidden") ? null : menu; // 현재 활성화 메뉴 업데이트
        }
    }

    function loadPage(event, page) {
        event.preventDefault();
        const contentFrame = parent.document.getElementById("contentFrame");

        if (contentFrame) {
            contentFrame.src = page;
            console.log(`Page loaded: ${page}`);

            // 기존 활성화된 링크의 스타일 제거
            if (activeLink) {
                activeLink.classList.remove("bg-blue-700", "text-white");
            }

            // 새로운 링크 스타일 적용
            event.target.classList.add("bg-blue-700", "text-white");
            activeLink = event.target; // 현재 링크 저장
        }
    }

    // 모든 사이드바 링크에 이벤트 추가
    document.querySelectorAll(".sidebar-link").forEach(link => {
        link.addEventListener("click", function (event) {
            const page = this.getAttribute("data-page");
            if (page) {
                loadPage(event, page);
            }
        });
    });

    // `toggleMenu` 함수를 전역으로 설정하여 HTML에서 호출 가능하도록 함
    window.toggleMenu = toggleMenu;
});
