import { useForm } from "react-hook-form";

import "./CreateCarBag.css";
import CarModel from "../../../Models/CarModel";
import ImageUploader from "../imageUploader/imageUploader";
import { useRef, useState } from "react";
import carService from "../../../Services/CarBagService";
import { useNavigate } from "react-router-dom";

function CreateCarBag(): JSX.Element {

    const navigate=useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [file,setFile]= useState<File>();
    const filePickerRef= useRef<HTMLInputElement |null>();

    const {register,handleSubmit,formState} = useForm<CarModel>();
    async function send(car:CarModel)
    {
        if(file)
        car.image=file;
        car.openBagDate=new Date();
        carService.addProduct(car);
        navigate(`/car-info`);

    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          const file = event.target.files[0];
          setFile(file);
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);
        }
      };

    const pickImageHandler = () =>{
        if(filePickerRef.current)
        filePickerRef.current.click();
    }

    return (
        <div className="CreateCarBag">
            <h1 className="CreateCarBagCard-header">יצירת תיק רכב</h1>
			<div className="CreateCarBagCard">
                <form className="signup-form-div" onSubmit={handleSubmit(send)}>
                        <div className="car-prop-div">
                            <label>מספר רכב:</label>
                            <input type="text" {...register("carnumber",CarModel.carNumberValidation)}></input>
                            <span>{formState.errors.carnumber?.message}</span>
                        </div>
                        <div className="car-prop-div">
                            <label>חברה:</label>
                            <input type="text" {...register("company",CarModel.stringValidation)}></input>
                            <span>{formState.errors.company?.message}</span>

                        </div>
                        <div className="car-prop-div">
                            <label>סוג:</label>
                            <input type="text" {...register("type",CarModel.stringValidation)}></input>
                            <span>{formState.errors.type?.message}</span>
                        </div>
                        <div className="car-prop-div">
                            <label>שנה:</label>
                            <input type="text" {...register("year",CarModel.YearValidation)}></input>
                            <span>{formState.errors.year?.message}</span>
                        </div>
                        <label>Image:</label>
                        <div className="imageUploader">
                            <input
                            ref={filePickerRef as React.RefObject<HTMLInputElement>}
                            style={{display:'none'}}
                            type="file"
                            accept=".png,jpg,jpeg"
                            onChange={handleImageChange}
                            />
                            <div className="image-upload">
                                <div className="image-upload__preview">
                                    {selectedImage && <img src={selectedImage} alt="Preview" />}
                                </div>
                                <button type="button" className="image-picker-button" onClick={pickImageHandler}>בחר תמונה</button>
                            </div>
                        </div>
                        <button>צור תיק רכב חדש</button>
                    </form>
            </div>
        </div>
    );
}

export default CreateCarBag;
