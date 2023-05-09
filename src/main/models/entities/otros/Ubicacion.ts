export class Ubicacion {
	constructor(
		private id: number,
		private calle: string,
		private altura: number,
		private localidad: string,
		private latitudLongitud: number[]
	) {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public getCalle(): string {
		return this.calle;
	}

	public setCalle(calle: string): void {
		this.calle = calle;
	}

	public getAltura(): number {
		return this.altura;
	}

	public setAltura(altura: number): void {
		this.altura = altura;
	}

	public getLocalidad(): string {
		return this.localidad;
	}

	public setLocalidad(localidad: string): void {
		this.localidad = localidad;
	}

	public getLatitudLongitud(): number[] {
		return this.latitudLongitud;
	}

	public setLatitudLongitud(latitudLongitud: number[]): void {
		this.latitudLongitud = latitudLongitud;
	}
}
