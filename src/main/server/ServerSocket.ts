import { Server , Socket } from "socket.io";
import { Server as Servidor } from "./Server";

export class ServerSocket {

    private io: Socket|any;

    constructor(server:Servidor){
        this.io = new Server(server.gethttpServer() , {cors:{origin:"*"}} )
    }

    public configurarMensajes () {
        const rutaSocket = this.io.of('/presentador/socket');
        rutaSocket.on("connection"  , (socket:Socket) => {
            console.log(`connect ${socket.id}`);

            socket.emit ("Mensaje" , "Bienvenido");

            socket.on("disconnect", () => {
                console.log(`disconnect ${socket.id}`);
            });

            // Logica agregada de web socket           
            socket.on ("leer", (condicion) => {
                console.log(condicion)
                if (condicion == "anterior"){
                    rutaSocket.emit("enviar", "prev");
                    console.log(`Anterior diapositiva`);
                }
                else if (condicion == "siguiente"){
                    rutaSocket.emit("enviar", "next");
                    console.log(`Siguiente diapositiva`);
                    
                }
            });
        });
    }
 
}