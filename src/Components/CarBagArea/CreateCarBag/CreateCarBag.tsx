import { useForm } from "react-hook-form";

import "./CreateCarBag.css";
import CarModel from "../../../Models/CarModel";
import ImageUploader from "../imageUploader/imageUploader";
import { useRef, useState } from "react";
import carService from "../../../Services/CarBagService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default CSS

function CreateCarBag(): JSX.Element {

    const companyList = ["אאודי", "הונדה", "מאזדה", "ב.מ.וו","סוזוקי","יונדאי","טויוטה"];
    const audiList = ["A1", "A2", "A3", "A3 סדאן","S3","A4","S5","A7"];
    const hondaList = ["גאז","סיוויק האצבק","סיוויק סדאן","גאז היברידית","HRV"];
    const mazdaList = ["2", "3", "4", "CX3","CX3","CX5","CX90","MX5"];
    const bmwList = ["סדרה 1", "סדרה 2", "סדרה 3", "סדרה סדרה 4","סדרה 5","M2","M4"];
    const toyotaList = ["איגו", "יאריס", "קורולה", "קרוס","ראב 4"];
    const hundaiList = ["i10", "i20", "אקסנט", "איוניק","אלנטרה"];
    const suzukiList = ["איגניס", "סוויפט", "ויטרה","אלטו","ספלאש"];
    const years = ["2010", "2011", "2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023"];   
   


   const [typeList,setTypeList] = useState<string[]>(audiList);
   const [company,setCompany] = useState<string>("אאודי");


    
    const navigate=useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [file,setFile]= useState<File>();
    const filePickerRef= useRef<HTMLInputElement |null>();

    

    function ChangeTypeList(event:any): void
    {
        setCompany(event.target.value);
        switch (event.target.value) {
            case "אאודי":
                setTypeList(audiList);
              break;
            case "הונדה":
                setTypeList(hondaList);
              break;
              case "מאזדה":
                setTypeList(mazdaList);
              break;
              case  "ב.מ.וו":
                setTypeList(bmwList);
              break;
              case "סוזוקי":
                setTypeList(suzukiList);
              break;
              case "יונדאי":
                setTypeList(hundaiList);
              break;
              case "טויוטה":
                setTypeList(toyotaList);
              break;
          };
    }

    const {register,handleSubmit,formState} = useForm<CarModel>();
    async function send(car:CarModel)
    {
        if(file)
        car.image=file;
        car.openBagDate=new Date();
        car.company=company;
        try{
        await carService.addProduct(car);
        navigate(`/car-info`);
        }catch(e){
            toast.error('רכב זה כבר קיים במערכת', {
                position: 'top-right',
                autoClose: 3000, // Time in milliseconds
              });
        }
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
              <ToastContainer /> {/* Required for displaying notifications */}
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
                            <select id="company" onChange={ChangeTypeList}>
                            {companyList.map((company, index) => (
                                <option key={index} value={company}>
                                {company}
                                </option>
                            ))}
                            </select>
                            <span>{formState.errors.company?.message}</span>

                        </div>
                        <div className="car-prop-div">
                            <label>סוג:</label>
                            <select id="type" {...register("type",CarModel.stringValidation)}>
                            {typeList.map((type, index) => (
                                <option key={index} value={type}>
                                {type}
                                </option>
                            ))}
                            </select>
                            <span>{formState.errors.type?.message}</span>
                        </div>
                        <div className="car-prop-div">
                            <label>שנה:</label>
                            <select id="year" {...register("year",CarModel.YearValidation)}>
                            {years.map((year, index) => (
                                <option key={index} value={year}>
                                {year}
                                </option>
                            ))}
                            </select>
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
