document.addEventListener("DOMContentLoaded", function () {
    const bomTreeView = document.getElementById("bomTreeView");
    let bomData = [];

    // 페이지 이동 함수
    window.navigateTo = function (page) {
        window.location.href = page;
    };

    // 🔹 BOM 트리 구조 업데이트 함수
    function addBOMToTree(productNumber, parentNumber, partNumber, itemName, itemType, quantity, unit, manufacturer, remarks) {
        let product = bomData.find(item => item.partNumber === productNumber);

        if (!product) {
            product = { partNumber: productNumber, name: `제품 ${productNumber}`, type: "제품", children: [] };
            bomData.push(product);
        }

        let parent = product.children.find(item => item.partNumber === parentNumber) || product;
        const newItem = { partNumber, name: itemName, type: itemType, quantity, unit, manufacturer, remarks, children: [] };
        parent.children.push(newItem);
        
        renderBOMTree();
    }

    // 🔹 BOM 트리 렌더링 함수
    function renderBOMTree() {
        bomTreeView.innerHTML = "";
        function createTreeView(data, parentElement) {
            const ul = document.createElement("ul");
            data.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `${item.name} (${item.partNumber})`;
                if (item.children.length > 0) {
                    createTreeView(item.children, li);
                }
                ul.appendChild(li);
            });
            parentElement.appendChild(ul);
        }
        createTreeView(bomData, bomTreeView);
    }

    // 🔹 `bom_register.js`에서 호출할 수 있도록 export
    window.addBOMToTree = addBOMToTree;
});
