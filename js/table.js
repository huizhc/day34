//清除表格
function clearTable () {
    let table = tableWr.getElementsByTagName('table')[0];
    if (typeof table == 'undefined') return;
    table.remove();
}
//渲染表格
function createTable (data) {
    clearTable();
    let table = document.createElement('table');
    //输出表头
    let tharr = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]; 
    let htr = document.createElement('tr');
    for (let i = 0; i < tharr.length; i ++) {
        let ith = document.createElement('th');
        let txt = document.createTextNode(tharr[i]);
        ith.appendChild(txt);
        htr.appendChild(ith);
    }
    table.appendChild(htr);
    tableWr.appendChild(table);
    //输出内容单元格
    if (typeof data === 'undefined' || data.length === 0) return;
    for (let i = 0; i < data.length; i ++) {
        let tr = document.createElement('tr');
        let itr = data[i];
        for (let j = 0; j < itr.length; j ++) {
            let td = document.createElement('td');
            let te = document.createTextNode(itr[j]);
            td.appendChild(te);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    // 为tr添加联动图形事件
    table.addEventListener('mouseover', function (e) {
        if (e.target.tagName === 'TD') {
            let tr = e.target.parentNode;
            tableReact(tr);
        }
    })
}

//表格增强
function tableX () {
    let relen = regionWr.checkedlen;
    let prlen = productWr.checkedlen;
    let table = tableWr.querySelector('table');
    let tr = table.querySelectorAll('tr');
    //当地区选择一项，商品选择多项时,交换第一二列位置
    if (relen === 1 && prlen !== 1) {  
        for (let i = 0; i < tr.length; i ++) {
            let txt = tr[i].children[0].textContent;
            tr[i].children[0].textContent = tr[i].children[1].textContent
            tr[i].children[1].textContent = txt;
        }
        // 合并单元格
        aliketd(tr);    
    }
    //商品当选择一项，地区选择多项时
    if (prlen === 1 && relen !== 1) {
        aliketd(tr);
    }
    if (prlen > 1 && relen > 1) {
        aliketd(tr);
    }
}
// 合并第一列相同内容的单元格
function aliketd (tr) {
    let pre = null;
    for (let i = 0; i < tr.length; i ++) {
        let now = tr[i].children[0];
        if (pre !== null && pre.textContent === now.textContent) {
            rowSpan(pre, now);
        } else {
            pre = now;
        }
    }
}
//单元格合并（接收两个要合并的单元格作为参数）
function rowSpan (fronttd, backtd) {
    let f_rowspan = fronttd.getAttribute('rowspan');
    if (f_rowspan) {
        f_rowspan = Number(f_rowspan) + 1;
        fronttd.setAttribute('rowspan', f_rowspan); 
    } else {
        fronttd.setAttribute('rowspan', 2);
    }
    backtd.style.display = 'none';
}
//表格联动图形
function tableReact (tr) {
    let data = [];
    //只取月份数据
    for (let i = 2; i < tr.children.length; i ++) {
        data.push(Number(tr.children[i].textContent));
    }
    createSvg(svgWr, data, 500, 300);
    createLine(canvasWr, data, 500, 300);
}