/*
 * @author: TANG
 * @create: 2021-04-20 17:38 PM
 * @license: MIT
 * @lastAuthor: TANG
 * @lastEditTime: 2021-04-28 14:38 PM
 * @desc: shopping
 */

axios
  .post("http://24123z8o79.zicp.vip/getAllGoods", {})
  .then(function (response) {
    // console.log(response.data);
    ft(response.data);
  })
  .catch(function (error) {
    console.log(error);
    alert("垃圾服务器又崩了！！！！！");
  });
let arrShop = [1]; //定义购物车数组
let Mainarr = []; //定义商品数组
function $(item) {
  return document.querySelector(item); //获取元素函数
}
function $all(it) {
  return document.querySelectorAll(it); //获取所有元素函数
}
function addCar(id) {
  //TODO加入购物车
  let flag = 0; //定义中间值，先拿拿到的ID去匹配商品数组，如果有，则再返回去匹配购物车数组，修改里面的数量值和小计值
  arrShop.forEach((item) => {
    if (item.goodsID == id) {
      flag++; //如果匹配上，则中间值加一
    }
  });
  if (flag != 0) {
    //如果中间值不为0，就表示匹配上了
    arrShop.forEach((item) => {
      if (item.goodsID == id) {
        item.num++;
        item.smallprice = item.num * item.price;
      }
    });
  } else {
    //为0就表示没有匹配上，如果没有匹配上，就把ID拿去匹配对应商品数组，接着把那一个商品的所有值都加入到购物车数组
    Mainarr.forEach((it) => {
      if (it.goodsID == id) {
        it.num = 1;
        it.smallprice = it.num * it.price;
        it.checked = true;
        arrShop.push(it);
      }
    });
  }
  fn(); //重新重新渲染一次页面
  allprice(); //重新计算一次总价格
  allnum(); //重新计算一次总数量
}
//!重点是：改变页面时，也需要和购物车数组数据同步才行
//TODO点击以及输入改变购物车商品数量
function change(id) {
  arrShop.forEach((item) => {
    if (item.goodsID == id) {
      if (
        Number(document.getElementById(item.goodsID + "npm").value) > 0 &&
        Number(document.getElementById(item.goodsID + "npm").value) < 99
      ) {
        item.num = Number(document.getElementById(item.goodsID + "npm").value); //获取文本里里的值，再改变购物车数组商品数量值，重新渲染
        item.smallprice = item.num * item.price;
      } else {
        alert("输入不合法！");
      }
    }
  });
  fn();
  allprice();
  allnum();
}

function add(id) {
  //TODO加符号触发
  arrShop.forEach((add_item) => {
    if (id == add_item.goodsID) {
      //找到与ID匹配的购物车商品，再把他的数量值加一，计算小计值
      add_item.num += 1;
      add_item.smallprice = add_item.num * add_item.price;
    }
  });
  fn();
  allprice();
  allnum();
}
function reduce(id) {
  //TODO减符号触发
  arrShop.forEach((add_item) => {
    //找到与ID匹配的购物车商品，再把他的数量值减一，计算小计值
    if (id == add_item.goodsID) {
      if (add_item.num > 1) {
        add_item.num -= 1;
        add_item.smallprice = add_item.num * add_item.price;
      }
    }
  });
  fn();
  allprice();
  allnum();
}
function remove(id) {
  //TODO删除当前购物车商品
  arrShop.forEach((add_item) => {
    //找到与ID匹配的购物车商品，再删除
    if (id == add_item.goodsID) {
      arrShop.splice(arrShop.indexOf(add_item), 1);
    }
  });
  fn();
  allprice();
  allnum();
}

function checkAll(it) {
  //TODO全选
  let arrCheck = $all(".check"); //获取所有购物车商品的选择框
  if (it.checked) {
    //点击时，如果全选框被选择了，那么所有商品的选择框属性都改为真，再重新渲染一次页面
    for (let i = 0; i < arrCheck.length; i++) {
      arrCheck[i].checked = true;
    }
    arrShop.forEach((item) => {
      item.checked = true;
    });
    $all(".che")[0].checked = true;
    $all(".che")[1].checked = true;
  } else {
    //点击时，如果全选框未选择，那么所有商品的选择框属性都改为假，再重新渲染一次页面
    for (let i = 0; i < arrCheck.length; i++) {
      arrCheck[i].checked = false;
    }
    arrShop.forEach((item) => {
      item.checked = false;
    });
    $all(".che")[0].checked = false;
    $all(".che")[1].checked = false;
  }
  fn();
  allprice();
  allnum();
}

//查找购物车数组里选择框选择了的商品，再把那些值删除
function removeCheck() {
  //TODO删除选择的购物车商品
  for (let i = 0; i < arrShop.length; i++) {
    arrShop.forEach((item) => {
      if (item.checked) {
        arrShop.splice(arrShop.indexOf(item), 1);
      }
    });
  }
  fn();
  allprice();
  allnum();
}

function removeAll() {
  //直接把购物车数组清空再渲染一次
  //TODO清理购物车
  arrShop = [1];
  fn();
  allprice();
  allnum();
}

function charge(id) {
  //单击时，页面选择框属性和数组选择框属性保持一致
  arrShop.forEach((item) => {
    if (item.goodsID == id) {
      if (item.checked) {
        item.checked = false;
      } else {
        item.checked = true;
      }
    }
  });
  let foog = 0;
  arrShop.forEach((it) => {
    if (it.checked == false) {
      foog++;
    }
  });
  if (foog == 0) {
    $all(".che")[0].checked = true;
    $all(".che")[1].checked = true;
  } else {
    $all(".che")[0].checked = false;
    $all(".che")[1].checked = false;
  }
  allprice();
  allnum();
}

function allprice() {
  //TODO计算总价格
  let allprice = $(".allPrice"); //获取需要输入值的地方
  let str = allprice.innerHTML; //把里面的值先保存到str数组
  let comstr = str.substring(0, 1); //把“￥”符号截取下来和数量拼接
  let sum = 0; //定义每一次的总价初始值为0
  arrShop.forEach((item) => {
    if (item.checked) {
      sum += item.smallprice; //计算总价格等于所有被选择的购物车商品的小计之和
    }
  });
  allprice.innerHTML = comstr + sum; //渲染
}

function allnum() {
  //TODO计算总数量
  let allsum = $(".footNum");
  let sum = 0;
  arrShop.forEach((item) => {
    if (item.checked) {
      sum += item.num;
    }
  });
  allsum.innerHTML = sum;
}

let comporary = $(".shopCard");
function fn() {
  let tem = ``;
  arrShop.forEach((it) => {
    if (it.checked) {
      if (it == 1) {
        //因为空数组不能被循环，所以先添加一个1，但是当如果遍历到1的时候，就会跳过
        return true; //continue
      } //模板字符串渲染
      tem += `
        <div class="shopcar" id='${it.goodsID}'>
            <div class="check">
                <input type="checkbox" name="" onclick="charge('${it.goodsID}')" checked>
            </div>
            <div class="im"></div>
            <div class="descr">
                ${it.desc}
            </div>
            <div class="price">
                ${it.price}
            </div>
            <div class="num">
                <div class="reduce" onclick="reduce('${it.goodsID}')">-</div>
                <input type="text" class="num1" id="${it.goodsID}npm" value="${it.num}"  onblur="change('${it.goodsID}')">
                <div class="add" onclick="add('${it.goodsID}')">+</div>
            </div>
            <div class="smallpri">
                ￥${it.smallprice}
            </div>
            <div class="operation">
                <div class="dele" onclick="remove('${it.goodsID}')">删除</div>
                <div class="guanzhu">移入关注</div>
            </div>
        </div>`;
    } else {
      if (it == 1) {
        return true; //continue
      }
      tem += `
        <div class="shopcar" id='${it.goodsID}'>
            <div class="check">
                <input type="checkbox" name="" onclick="charge('${it.goodsID}')">
            </div>
            <div class="im"></div>
            <div class="descr">
                ${it.desc}
            </div>
            <div class="price">
                ${it.price}
            </div>
            <div class="num">
                <div class="reduce" onclick="reduce('${it.goodsID}')">-</div>
                <input type="text" class="num1" id="${it.goodsID}npm" value="${it.num}"  onblur="change('${it.goodsID}')">
                <div class="add" onclick="add('${it.goodsID}')">+</div>
            </div>
            <div class="smallpri">
                ￥${it.smallprice}
            </div>
            <div class="operation">
                <div class="dele" onclick="remove('${it.goodsID}')">删除</div>
                <div class="guanzhu">移入关注</div>
            </div>
        </div>`;
    }
  });
  comporary.innerHTML = tem;
}

function ft(itt) {
  let comporar = $(".bigBox");
  Mainarr = itt;
  Mainarr.forEach(function (item) {
    comporar.innerHTML += `<div class="box" id='${item.goodsID}' >
        <div class="img"></div>
        <div class="pri">￥${item.price}</div>
        <div class="content">
        <span class="minTitle">${item.name}</span>
        <span class="minContent"
            >&nbsp;(HP)
            ${item.desc}
        </span>
        </div>
        <div class="conmment">
        <span class="wan"> ${item.evaNum} </span>
        <span class="plun
        "> ＋条评论 </span>
        </div>
        <div class="store">${item.merchant}</div>
        <div class="iconc">
        <div class="duibi">
            <span class="icon iconfont dui">&#xea70;</span>&nbsp;对比
        </div>
        <div class="guanzhu">
            <span class="icon iconfont guan">&#xe602;</span>&nbsp;关注
        </div>
        <div class="gouwu" onclick = "addCar('${item.goodsID}')">
            <span class="icon iconfont gou">&#xe700;</span>&nbsp;加入购物车
        </div>
        </div>
    </div>`;
    item.num = 1;
    item.smallprice = 0;
    item.checked = false;
  });
}
