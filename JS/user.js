
// 用户名的改变
$(function () {
    var currentUser = readCookie("currentUser")
    console.log(readCookie("currentUser")) 
    $(".user").html(currentUser)
})
function deleteTr(obj){		
    obj.parentNode.parentNode.remove();	//删除上上一级的元素	
}


function pitchOn(){
    var check=document.getElementsByName("cars");
    var alc=document.getElementById("ca");
    var txt=document.getElementsByClassName("ss");
    var isd = alc.checked;
    if(isd){
        txt[0].innerText="取消全选";
    }else{
        txt[0].innerText="全选";
    }
    for(var i=0;i<check.length;i++){
        check[i].checked=isd;
    }
}


function deleteAI() {
    var cn = document.getElementsByName("cars");

    for (var i = 0; i < cn.length;i++) {
        if (cn[i].checked){
            deleteTr(cn[i]);
            i = -1;
        }
    }
}
//
window.onload=function()
{
    var oTab=document.getElementById("tab1");
    // alert(oTab.getElementsByTagName("tbody")[0].getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML);
    // //表格可以简便写成下面的
    // alert(oTab.tBodies[0].rows[1].cells[1].innerHTML);
    // 
    // 
    // 隔行变色
    for(var i=0;i<oTab.tBodies[0].rows.length;i++)
    {
        var col1='';  //储存当前标题栏的颜色
        oTab.tBodies[0].rows[i].onmouseover=function()
        {
            col1=this.style.background;  //先把当前的颜色存储起来
            this.style.background="#ccc";  //当移动到其中的td标签上显示红色
        }
        oTab.tBodies[0].rows[i].onmouseout=function()//当离开td时候，变回原来的颜色
        {
            this.style.background=col1;
        }
        
    }



//增加一个li
    var sonname =document.getElementById("sonname");
    var sonhand =document.getElementById("sonhand");
    var add=document.getElementById("btn");
     var num=oTab.tBodies[0].rows.length+1;//先增加row 的长度
    add.onclick=function()
    {
       

        var newRow= document.createElement("tr");  //增加新的一行
        var newCell0=document.createElement("td");  //增加新的一列
        newCell0.innerHTML=num++;
        newRow.appendChild(newCell0);

        var newCell1=document.createElement("td");  //再增加一列
        newCell1.innerHTML=sonname.value;              //text上的值
        newRow.appendChild(newCell1);


        var newCell2=document.createElement("td");   //再增加一列
        newCell2.innerHTML=sonhand.value;              //text的值
        newRow.appendChild(newCell2);

        var newCell3=document.createElement("td");     //增加一列
        newCell3.innerHTML="<a href='javascript:;'>删除</a>";    //加入删除标签
        newRow.appendChild(newCell3);

        oTab.tBodies[0].appendChild(newRow);  // 把这行放入body上

        newCell3.getElementsByTagName("a")[0].onclick=function()   //当点解删除标签删除tr节点
        {
            oTab.tBodies[0].removeChild(this.parentNode.parentNode);  //this为a标签 this.parentNode为td   this.parentNode.parentNode为tr
        }
    }
    
        
    //搜索功能
    var oTex=document.getElementById("search1");
    var oBtn=document.getElementById("btn2");

    oBtn.onclick=function()
    {
        
        for(var i=0;i<oTab.tBodies[0].rows.length;i++)
        {
            var sTab=oTab.tBodies[0].rows[i].cells[1].innerHTML.toLowerCase();//行中名字的值并转化成小写
            var sTex=oTex.value.toLowerCase();  //用户输入的值并转化成小写
            var arr=sTex.split(' ');//如果用户用空格隔开关键字

            oTab.tBodies[0].rows[i].style.background='';//把所有的背景都设置为空
            //如果刷选，把css换成block显示就行

            for(var j=0;j<arr.length;j++)
            {
                if (sTab.search(arr[j])!=-1)  //调用search函数查找截取出来的字符数组，判断是否存在，
                {
                    oTab.tBodies[0].rows[i].style.background="#30C37C";//存在改变td的颜色
                }
                
            }
        }
    }

};
function deleteTr(obj){		
obj.parentNode.parentNode.remove();	//删除上上一级的元素	
}


function pitchOn(){
var check=document.getElementsByName("cars");
var alc=document.getElementById("ca");
var txt=document.getElementsByClassName("ss");
var isd = alc.checked;
if(isd){
    txt[0].innerText="取消全选";
}else{
    txt[0].innerText="全选";
}
for(var i=0;i<check.length;i++){
    check[i].checked=isd;
}
}


function deleteAI() {
var cn = document.getElementsByName("cars");

for (var i = 0; i < cn.length;i++) {
    if (cn[i].checked){
        deleteTr(cn[i]);
        i = -1;
    }
}
}