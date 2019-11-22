  // 生成checkBox
  function createCh (checkWr, value) {
    let allcheck = document.createElement('input');
    let allchecktxt = document.createTextNode('全选');
    allcheck.setAttribute('type', 'checkbox');
    //添加代表是否是全选按钮的自定义属性all
    allcheck.all = Boolean(true);
    //加入父容器内
    checkWr.appendChild(allcheck);
    checkWr.appendChild(allchecktxt);
    for (let i = 0; i < value.length; i ++) {
        let checkbox = document.createElement('input');
        let checkboxtxt = document.createTextNode(value[i]);
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('value', value[i]);
        checkbox.all = Boolean(false);
        checkWr.appendChild(checkbox);
        checkWr.appendChild(checkboxtxt);
    }
    //事件委托
    checkWr.addEventListener('click', function (e) {
        let target = e.target;
        //目标元素如果是checkbox，添加checkbox点击事件
        if (target.tagName === 'INPUT' && target.type === 'checkbox') {
            checkboxClick(this, target);
            let data = getData();
            createTable(data);
            //增强表格
            tableX();
        }
    })
}
    // checkBox的点击事件，接收父元素和目标元素
function checkboxClick (checkWr, target) {
    let checkbox = checkWr.getElementsByTagName('input');
    //设置父元素自定义属性checkedlen
    checkWr.checkedlen = 0;
    for (let i = 0; i < checkbox.length; i ++) {
        if (checkbox[i].checked){
            checkWr.checkedlen ++;
        }
    }
    //点击的如果是全选按钮
    if (target.all) {
        if (target.checked) {
            for (let i = 0; i < checkbox.length; i ++) {
                checkbox[i].checked = true;
                checkWr.checkedlen = 3;
            }
        } else {
            for (let i = 0; i < checkbox.length; i ++) {
                checkbox[i].checked = false;
                checkWr.checkedlen = 0;
            }
        }
    } else {
        //点击的是普通按钮
        //计算选中的checkbox数量，
        if (target.checked) {
            if (checkWr.checkedlen === checkbox.length - 1) {
                checkbox[0].checked = true;
            }
        } else {
            if (checkWr.checkedlen === checkbox.length - 1) {
                checkbox[0].checked = false;
            }
            if (checkWr.checkedlen === 0) {
                target.checked = true;
                checkWr.checkedlen = 1;
            }
        }
    }
}
