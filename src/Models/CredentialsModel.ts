class CredentialsModel {
    public username!:string;
    public password!:string;

    public static userNameValidation = {
        required: { value: true, message: "Missing Name" },
        minLength: { value: 3, message: "Name too short" },
        maxLength: { value: 50, message: "Name too long" }
    }

    public static passwordValidation = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 3, message: "password too short" },
        maxLength: { value: 50, message: "password too long" }
    }
}

export default CredentialsModel;