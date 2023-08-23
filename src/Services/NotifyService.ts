import { Notyf } from "notyf";

class NotifyService{

    private notyf = new Notyf({
        duration:3000,
        dismissible: true,
        position:{x: "center",y:"top"}
     });

     public success(message:string):void{
        this.notyf.success(message);
     };
     public error(err:any):void{
        const message = this.getError(err);
        this.notyf.error(message);
    }

    private getError(err:any):string{
        if (typeof err ==="string") return err;
        if (typeof err.response?.data ==="string") return err.response.data;
        if(Array.isArray(err.response?.data))return err.response.data[0];
        if(typeof err.message === "string") return err.message;

        return "some error, please try again";
    }
}

const notifyService = new NotifyService();

export default notifyService;