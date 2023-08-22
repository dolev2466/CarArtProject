class CarModel{
    public carnumber!: number;
    public company!: string;
    public type!: string;
    public year!: number;
    public ownername!: string;
    public image!: File;
    public openBagDate!: Date

    public static carNumberValidation = {
        required: { value: true, message: "Invalid car number" },
        minLength: { value: 7, message: "too short car number" },
        maxLength: { value: 8, message: "too long car number" }
    }

    public static stringValidation = {
        required: { value: true, message: "Missing value" },
        minLength: { value: 2, message: "value too short" },
        maxLength: { value: 50, message: "value too long" }
    }
    public static YearValidation = {
        required: { value: true, message: "Missing value" },
        minLength: { value: 4, message: "value too short" },
        maxLength: { value: 4, message: "value too long" }
    }


}




export default CarModel