document.addEventListener("DOMContentLoaded", function () {

    //主要交互逻辑

    var form = document.getElementById("myForm");
    var selectedOptionsSpan = document.getElementById("selectedOptions");
    var container = document.getElementById("container");

    var startButton = document.getElementById("start-Button");
    var nextButton = document.getElementById("next-Button");
    var ansButton = document.getElementById("ans-Button");
    var loader = document.getElementById("loader");

    var selectedOptions = [];
    var selectedBgKey = [];
    var selectedPreferKey = [];

    let bgKeysList; //背景信息列表
    let preferenceKeysList;//需求列表
    let answer;// 定义一个变量来保存答案

    // 定义IP地址和端口号变量
    const ipAddress = '127.0.0.1';
    //const ipAddress = '120.26.138.176';

    const port = '8000';

    //生成默认提示词
    genDefOptions();


    //按下开始按钮
    document.getElementById('start-Button').addEventListener('click', () => {
        const questionInput = document.getElementById('questionInput').value;
        // 发送GET请求
        console.log(questionInput);
        axios
            .get(
                `http://${ipAddress}:${port}/knowledgeQuery/setting/1?question_input=${questionInput}`,
            )
            .then((response) => {
                console.log(response.data);
                // 处理响应数据的逻辑
            })
            .catch((error) => {
                console.error(error);
                // 处理错误的逻辑
            });

        console.log('selectedOptions:', selectedOptions);
        console.log('selectedBgKey:', selectedBgKey);
        console.log('selectedPreferKey:', selectedPreferKey);

        // 发送PUT请求
        axios
            .put(
                `http://${ipAddress}:${port}/knowledgeQuery/recursiveProcessing`,
                { bg_keys_list_input: selectedBgKey, preference_keys_list_input: selectedPreferKey }
            )
            .then((response) => {
                bgKeysList = response.data["Background Keys"];
                preferenceKeysList = response.data["Preference Keys"];
                console.log(response.data);
                console.log('bgKeysList:', bgKeysList);
                console.log('preferenceKeysList:', preferenceKeysList);
                var nums = bgKeysList.length + preferenceKeysList.length;

                generateOptions(nums);

            })
            .catch((error) => {
                console.error(error);
                // 处理错误的逻辑
            });

        //点击后增加按钮
        nextButton.style.display = "block";
        ansButton.style.display = "block";
        startButton.style.display = 'none';


        /********** 点击后处理过程 **********/


        // 处理逻辑代码
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
            loader.style.display = "block"; // 显示加载动画
        }, 800); // 设置延时以观察动画效果

    });

    //点击下一个开始下一轮选择
    nextButton.addEventListener("click", () => {
        console.log('selectedOptions:', selectedOptions);
        console.log('selectedBgKey:', selectedBgKey);
        console.log('selectedPreferKey:', selectedPreferKey);

        // 发送PUT请求
        axios
            .put(
                `http://${ipAddress}:${port}/knowledgeQuery/recursiveProcessing`,
                { bg_keys_list_input: selectedBgKey, preference_keys_list_input: selectedPreferKey }
            )
            .then((response) => {
                bgKeysList = response.data["Background Keys"];
                preferenceKeysList = response.data["Preference Keys"];
                console.log(response.data);
                console.log('bgKeysList:', bgKeysList);
                console.log('preferenceKeysList:', preferenceKeysList);
                var nums = bgKeysList.length + preferenceKeysList.length;
                generateOptions(nums);

            })
            .catch((error) => {
                console.error(error);
                // 处理错误的逻辑
            });

        // 处理逻辑代码
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
            loader.style.display = "block"; // 显示加载动画
        }, 800); // 设置延时以观察动画效果


    });
    // 点击回答获得问题最终答案
    ansButton.addEventListener("click", () => {
        console.log('test');
        // 发送PUT请求
        axios
            .put(
                `http://${ipAddress}:${port}/knowledgeQuery/recursiveProcessing`,
                { bg_keys_list_input: selectedBgKey, preference_keys_list_input: selectedPreferKey }
            )
            .then((response) => {
                console.log('成功进入');
                // 发送GET请求给后端接口
                axios
                    .get(`http://${ipAddress}:${port}/knowledgeQuery/ask_kb`)
                    .then((response) => {
                        // 将返回的答案保存在变量中
                        answer = response.data;
                        console.log(answer);
                        // 在这里添加ansButton点击后的操作
                    })
                    .catch((error) => {
                        // 处理请求错误
                        console.error('请求失败', error);
                    });

            })
            .catch((error) => {
                console.error(error);
                // 处理错误的逻辑
            });
        
        // 处理逻辑代码
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
            loader.style.display = "block"; // 显示加载动画
        }, 800); // 设置延时以观察动画效果



    });



    //获取默认提示词
    function genDefOptions() {
        fetch('json/test.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // 存储到合适的数据结构中
                bgKeysList = data.bg_keys_list_input;
                preferenceKeysList = data.preference_keys_list_input;

                // 控制台打印结果
                console.log('bgKeysList:', bgKeysList);
                console.log('preferenceKeysList:', preferenceKeysList);

                var numberOfOptions = bgKeysList.length + preferenceKeysList.length; //生成的选项数量
                generateOptions(numberOfOptions);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation: ', error);
            });
    }



    function generateOptions(numberOfOptions) {
        loader.style.display = 'none';
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
                if (index < bgKeysList.length) {
                    option.innerText = bgKeysList[index];
                    option.style.backgroundColor = "pink";
                }
                else {
                    option.innerText = preferenceKeysList[index - bgKeysList.length];
                }
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
                        if (this.style.backgroundColor == "pink") {
                            selectedBgKey.push(this.innerText);
                        }
                        else {
                            selectedPreferKey.push(this.innerText);
                        }
                    } else {
                        this.classList.remove("selected");
                        selectedOptions.splice(this.innerText);
                        if (this.style.backgroundColor == "pink") {
                            selectedBgKey.splice(this.innerText);
                        }
                        else {
                            selectedPreferKey.splice(this.innerText);
                        }
                    }
                    selectedOptionsSpan.innerText = selectedOptions.join(", ");
                });
                index++;
            }
        }
    }
});