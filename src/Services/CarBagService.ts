import axios from "axios";
import CarModel from "../Models/CarModel";
import appConfig from "../utils/AppConfig";
import {AddCarClear} from "./Middleware";
import { addCar, carsStore, fetchCars } from "../Redux/CarBagState";

class CarBagService{
    public async getAllCars(): Promise<CarModel[]>
    {
        let cars= carsStore.getState().cars;   
            const response = await axios.get<CarModel[]>(appConfig.carsBagUrl);
            cars = response.data;
            carsStore.dispatch(fetchCars(cars));
        return cars;
    }

    public async getCar(carNumber:number): Promise<CarModel>
    {
        let car = carsStore.getState().cars.find(c=>c.carnumber=carNumber);
        if(!car)
        {
            const response = await axios.get<CarModel>(appConfig.carsBagUrl + carNumber);
            car = response.data;
        }
        return car;
    }

    public async addProduct(car:CarModel):Promise<void>
    {
      const headers={"Content-Type": "multipart/form-data"}
      const formData=new FormData();
      formData.append("carnumber",car.carnumber.toString());
      formData.append("company",car.company);
      formData.append("type",car.type);
      formData.append("ownername",car.ownername);
      formData.append("year",car.year.toString());
      formData.append("openBagDate",car.openBagDate.toISOString())
      formData.append("image",car.image);
      const response = await axios.post<CarModel>(appConfig.carsBagUrl,formData,{headers});
      const addedCar = response.data;
      carsStore.dispatch(addCar(addedCar))
    }
}

const carService = new CarBagService();

export default carService;