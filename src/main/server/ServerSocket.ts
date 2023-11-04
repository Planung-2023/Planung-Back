
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
            socket.on ("start", () => {
                socket.emit ("presentacion", "start");
                console.log(`Empezar presentación`);
            });

            socket.on ("next", () => {
                socket.emit("presentacion", "next");
                console.log(`Siguiente diapositiva`);
            })

            socket.on ("prev", () => {
                socket.emit ("presentacion", "start");
                console.log(`Diapositiva anterior`);
            })
        });
    }
 
}