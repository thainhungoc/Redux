// import React, { useState } from 'react'
// import { Button, Form } from 'react-bootstrap'
// import { storage } from '../firebase/configFirebase';
// import { getDownloadURL, uploadBytes } from 'firebase/storage';
// export const Upload = ()=> {
//     // taoj một mảng lưu trữ file
//     const [files, setFiles] = useState <File[]>([]);
//     console.log(files);

//     //upload khi nhấn vào ô upload
//     const uploadFile = ()=>{
//         // gửi file đến server của firebase
//         Promise.all(
//             files.map((image)=>{
//                 const imageRef = ref(storage, `images/${image.name}`)
//                 // xử lý upload thông qua return
//                 return uploadBytes(imageRef, image).then((snapshot)=>{
//                     return getDownloadURL(snapshot.ref)   // đường dẫn truy cập ảnh sau upload, có thể sử dụng nó 
//                 }) 

//             })
//         ).then((res : string[])=>{
//             console.log(res) // mảng đường dẫn ảnh sau upload
//         })
//     }

//     return (
//         <div>
//             <Form.Group controlId="formFileLg" className="mb-3">
//                 <Form.Label>Large file input example</Form.Label>
//                 <Form.Control type="file" size="lg" multiple onChange={(e) => setFiles(e.target.files)}/>
//                 <Button variant='success' onClick={uploadFile}>Upload</Button>
//             </Form.Group>
//         </div>
//     )
// }
   




import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { storage } from '../firebase/configFirebase';

export const Upload = () => {

    // tạo 1 mảng lưu trữ file 
    const [files, setFiles] = useState<File[]>([]);
    const [file, setFile] =  useState<File|null>(null)
    const [urls , setUrrls] = useState<string[]>([]);
console.log(files);

const onchange = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const filList : FileList|null = e.target.files;
    if (!filList) return;
    const file = filList[0];
    setFile(file)
}

// upload khi ấn ô button
const onUploadFile = ()=>{
    // gửi file đến server của fire base
    //...
   
//    Promise.all(
//     files.map(async (file) => {
//         const storageRef = ref(storage, file.name);
//         await uploadBytes(storageRef, file);
//         const downloadURL = await getDownloadURL(storageRef);
//         console.log('File uploaded to', downloadURL);
//         setUrrls([...urls, downloadURL]); // cập nhật vào mảng URLs
//     })
//    )

    if (file == null) return;
    const imageRef = ref(storage, `uploadImage/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrrls([...urls,url]);
      });
    }); 
}

  return (
    <div>
    <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Large file input example</Form.Label>
        <Form.Control type="file" size="lg" multiple onChange={onchange} />
        <Button variant='success' onClick={onUploadFile}>Upload</Button>
    </Form.Group>
    <div className="afterUpload">
        {
            urls.map((url,index) => (
                <div key={index}>
                    <img src={url} alt={url} width="200" />
                </div>
            ))
        }
    </div>
    </div>

  )
}