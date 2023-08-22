import React, { useRef,useState, useEffect} from "react";

import "./InvitaionImageUploader.css";

function InvitaionImageUploader(): JSX.Element {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [file,setFile]= useState<File>();
    const filePickerRef= useRef<HTMLInputElement |null>();
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          const file = event.target.files[0];
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);
        }
      };

    const pickImageHandler = () =>{
        if(filePickerRef.current)
        filePickerRef.current.click();
    }
    
    return (
        <div>
        <div className="InvitaionImageUploader">
			<input
            ref={filePickerRef as React.RefObject<HTMLInputElement>}
            style={{display:'none'}}
            type="file"
            accept=".png,jpg,jpeg"
            onChange={handleImageChange}
            />
            <button type="button" className="InvitaionImageUploaderimage-picker-button" onClick={pickImageHandler}>בחר תמונה</button>
            <div className="InvitaionImageUploaderimage-upload">
                <div className="InvitaionImageUploaderimage-upload__preview">
                    {selectedImage && <img src={selectedImage} alt="Preview" />}
                </div> 
            </div>
        </div>
        </div>
    );
}

export default InvitaionImageUploader;
