import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
interface ExportPdfProps {
  title: String;
  ele: Element | HTMLElement| any;
  preview?:Boolean
}
/**
 * 将当前组件视图导出为pdf
 */
export const exportPDF = async ({ title, ele,preview = false }: ExportPdfProps)=> {
   // 根据dpi放大，防止图片模糊
   const scale = window.devicePixelRatio > 1 ? window.devicePixelRatio : 2;
   // 下载尺寸 a4 纸 比例
   let pdf = new jsPDF('p', 'pt', 'a4');
   let width = ele.offsetWidth;
   let height = ele.offsetHeight;
   console.log('height', height)
   console.log('aa', width, height, scale)
 
   const canvas = document.createElement('canvas');
   canvas.width = width * scale;
   canvas.height = height * scale;
   var contentWidth = canvas.width;
   var contentHeight = canvas.height;
 
   console.log('contentWidth', contentWidth, contentHeight)
   //一页pdf显示html页面生成的canvas高度;
   var pageHeight = contentWidth / 592.28 * 841.89;
   //未生成pdf的html页面高度
   var leftHeight = contentHeight;
   console.log('leftHeight', leftHeight)
   //页面偏移
   var position = 0;
   //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
   var imgWidth = 595.28;
   var imgHeight = 592.28 / contentWidth * contentHeight;
   const pdfCanvas = await html2canvas(ele, {
     useCORS: true,
     canvas,
     scale,
     width,
     height,
     x: 0,
     y: 0,
   });
   const imgDataUrl = pdfCanvas.toDataURL();
 
   if (height > 14400) { // 超出jspdf高度限制时
     const ratio = 14400 / height;
     // height = 14400;
     width = width * ratio;
   }
 
   // 缩放为 a4 大小  pdfpdf.internal.pageSize 获取当前pdf设定的宽高
   height = height * pdf.internal.pageSize.getWidth() / width;
   width = pdf.internal.pageSize.getWidth();
   if (leftHeight < pageHeight) {
     pdf.addImage(imgDataUrl, 'png', 0, 0, imgWidth, imgHeight);
   } else {    // 分页
     while (leftHeight > 0) {
       pdf.addImage(imgDataUrl, 'png', 0, position, imgWidth, imgHeight)
       leftHeight -= pageHeight;
       position -= 841.89;
       //避免添加空白页
       if (leftHeight > 0) {
         pdf.addPage();
       }
     }
   }
   if(preview){
    // 生成外链让iframe标签展示
    // return pdf.output('datauristring')
    //  pdf.output('datauri');//直接在当前页面输出预览
     return handelUrl(pdf.output('datauristring'))
   }
  //导出下载 
  await pdf.save(`${title}.pdf`);
}


const base64URLtoBlob = (baseurl:string)=> {
  let arr:any = baseurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
      type: mime
  });
}

const handelUrl = (data:string)=>{
  const fileData = base64URLtoBlob(data);//将后端返回的base64格式转换成文件流
  let blob = new Blob([fileData], {
	  type: 'application/pdf;charset=UTF-8'
  });
	return URL.createObjectURL(blob); //创建预览路径,将预览路径传入pdf.js插件中的viewer.html页面进行预览
}


//调用下载为pdf  exportPDF('测试导出PDF', this.pdfRef.current)