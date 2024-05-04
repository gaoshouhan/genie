function fetchDataAndStore() {
  fetch('D:\\VScode\\genie\\json\\test.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // 存储到合适的数据结构中
      const bgKeysList = data.bg_keys_list_input;
      const preferenceKeysList = data.preference_keys_list_input;

      // 打印结果
      console.log('bgKeysList:', bgKeysList);
      console.log('preferenceKeysList:', preferenceKeysList);

      // 在这里你可以对数据进行进一步处理或者调用其他函数
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation: ', error);
    });
}

// 调用函数以触发读取和存储操作
fetchDataAndStore();
