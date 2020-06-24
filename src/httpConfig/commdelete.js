import  { MessageBox } from "element-ui";
export function isDelete(val = "您确定删除该数据吗？"){
    let mes = `<p>${val}</p>`;
    let pro = MessageBox.confirm(mes, "提示", {
        confirmButtonText: "确定",
        center: true,
        dangerouslyUseHTMLString: true
    });
    pro.catch(() => {});
    return pro;
}