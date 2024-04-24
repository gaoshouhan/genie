

document.addEventListener("DOMContentLoaded", function () {
    //主要交互逻辑
    var selectedOptions = [];
    var form = document.getElementById("myForm");
    var selectedOptionsSpan = document.getElementById("selectedOptions");
    var container = document.getElementById("container");
    var startButton = document.getElementById("startButton");
    var submitButton = document.getElementById("submitButton");

    startButton.addEventListener("click", function () {
        var numberOfOptions = 30; // 生成的选项数量
        generateOptions(numberOfOptions);
        startButton.style.display = "none";
        submitButton.style.display = "block";
    });

    submitButton.addEventListener("click", function () {
        var options = document.getElementsByClassName("option");
        for (var i = 0; i < options.length; i++) {
            options[i].style.left = "50%";
            options[i].style.top = "50%";
        }
        setTimeout(function () {
            form.reset();
            selectedOptions = [];
            selectedOptionsSpan.innerText = "";
            container.innerHTML = ""; // 清空容器
            var numberOfOptions = 30; // 生成的选项数量
            generateOptions(numberOfOptions);
        }, 800); // 设置延时1秒
    });

    function generateOptions(numberOfOptions) {
        container.innerHTML = ""; // 清空容器
        var columns = Math.ceil(Math.sqrt(numberOfOptions)); // 计算列数
        var rows = Math.ceil(numberOfOptions / columns); // 计算行数
        var optionWidth = 100;
        var optionHeight = 50;
        var spacingX = 20;
        var spacingY = 20;
        var containerRect = container.getBoundingClientRect(); // 获取容器相对于视口的位置信息
        var initialX = containerRect.left + (containerRect.width - columns * (optionWidth + spacingX)) / 2; // 初始水平位置
        var initialY = containerRect.top + (containerRect.height - rows * (optionHeight + spacingY)) / 2; // 初始垂直位置
        var index = 0;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                if (index >= numberOfOptions) break;
                var option = document.createElement("div");
                option.className = "option";
                option.innerText = "Option " + (index + 1);
                var x = initialX + j * (optionWidth + spacingX);
                var y = initialY + i * (optionHeight + spacingY);
                // 偶数行向右偏移
                if (i % 2 === 1) {
                    x += (optionWidth + spacingX) / 2;
                }
                option.style.left = x + "px";
                option.style.top = y + "px";
                container.appendChild(option);
                // 为了触发动画效果，将设置 opacity 放在 setTimeout 中
                setTimeout(function (option) {
                    option.style.opacity = 1; // 设置透明度为1，使其显示
                }, index * 50, option); // 设置延时
                option.addEventListener("click", function () {
                    if (!this.classList.contains("selected")) {
                        this.classList.add("selected");
                        selectedOptions.push(this.innerText);
                    } else {
                        this.classList.remove("selected");
                        var index = selectedOptions.indexOf(this.innerText);
                        if (index != -1) {
                            selectedOptions.splice(index, 1);
                        }
                    }
                    selectedOptionsSpan.innerText = selectedOptions.join(", ");
                });
                index++;
            }
        }
    }


});





