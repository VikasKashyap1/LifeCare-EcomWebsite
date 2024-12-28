export default function ImageVlidator(event) {
     let { files } = event.target;
     if (files.length === 1) {
         if (files[0].size > 2097152) { // Access files[0].size instead of files.size
             return "please upload image less than 1MB";
         } else if (files[0].type === 'image/jpeg' || files[0].type === 'image/jpg' || files[0].type === 'image/png' || files[0].type === 'image/gif') {
             return "";
         } else {
             return "Ind image, please try jpeg, jpg, png, gif";
         }
     } else {
         let message = "";
         let errors = [];
         Array.from(files).forEach((item, index) => {
          if (item.size > 2097152) { // 2MB in bytes
              errors.push(`Pic ${index + 1}: Please upload an image less than 2MB`);
          } else if (item.type !== 'image/jpeg' && item.type !== 'image/jpg' && item.type !== 'image/png' && item.type !== 'image/gif') {
              errors.push(`Invalid image ${index + 1}: Please try jpeg, jpg, png, gif`);
          }
      });
  
      return errors.length > 0 ? errors : "";
        
     }
 }
