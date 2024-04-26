
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
        var containerRect = container.getBoundingClientRect();
    
        // 仅计算容器内的中心点，不需要加上容器的边框偏移
        var centerX = containerRect.width / 2;
        var centerY = containerRect.height / 2;
    
        // 将每个选项移动至容器内的中心位置
        for (var i = 0; i < options.length; i++) {
            // 转换为相对于容器的位置
            options[i].style.position = 'absolute';
            options[i].style.left = (centerX - options[i].offsetWidth / 2) + "px";
            options[i].style.top = (centerY - options[i].offsetHeight / 2) + "px";
            options[i].style.transition = 'all 0.8s ease'; // 添加平滑过渡效果
        }
    
        setTimeout(function () {
            form.reset();
            selectedOptions = [];
            selectedOptionsSpan.innerText = "";
            container.innerHTML = ""; // 清空容器
            var numberOfOptions = 30; // 重新生成的选项数量
            generateOptions(numberOfOptions);
        }, 800); // 设置延时以观察动画效果
    });
    

    function generateOptions(numberOfOptions) {
    container.innerHTML = ""; // 清空容器
    var columns = Math.ceil(Math.sqrt(numberOfOptions)); // 计算列数
    var rows = Math.ceil(numberOfOptions / columns); // 计算行数
    var optionWidth = 100;
    var optionHeight = 50;
    var spacingX = 20;
    var spacingY = 20;

    // 计算选项总宽度和总高度
    var totalWidth = columns * (optionWidth + spacingX) - spacingX;
    var totalHeight = rows * (optionHeight + spacingY) - spacingY;

    var containerRect = container.getBoundingClientRect(); // 获取容器相对于视口的位置信息
    
    // 计算初始位置以使选项组居中
    var initialX = (containerRect.width - totalWidth) / 2;
    var initialY = (containerRect.height - totalHeight) / 2;
    
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
            
            option.style.position = "absolute";
            option.style.left = x + "px";
            option.style.top = y + "px";
            container.appendChild(option);
           
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





