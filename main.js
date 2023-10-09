angular
.module("vlsm", [])
.constant("POSICIONES", "primera segunda tercera cuarta quinta sexta séptima octava novena décima decimoprimera decimosegunda decimotercera decimocuarta decimoquinta".split(" "))
.constant("REGEX_IP", /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
.constant("CLASE_C", {
	maximoNumeroHosts: 254,
	potenciaMinima: 2,
	potenciaMaxima: 8,
	bitsMascara: 24,
	bitsPorOcteto: 8,
	hostsPorSubred: 126
})
.controller("MainController", ["$scope","CLASE_C","REGEX_IP", "POSICIONES", ($scope, CLASE_C, REGEX_IP, POSICIONES)=>{
	$scope.imprimir = ()=>{
		window.print();
	};
	$scope.getPosition = index => POSICIONES[index];
	$scope.quitarTabla = () => {
		$scope.ips = null;
	};
	$scope.ip = "192.168.1.0";
	$scope.hosts = "50,8,21,25,5,18,4,10,5,9,5";
	$scope.obtenerPotenciaSuficiente = numeroHosts => {
		if(numeroHosts > CLASE_C.maximoNumeroHosts) throw Error("¡Más hosts de los permitidos!");
		for(let x = CLASE_C.potenciaMinima; x <= CLASE_C.potenciaMaxima; x++)
			if(Math.pow(2, x) - 2 >= numeroHosts) return x;
	};
	
	$scope.parsearIp = ip => ip.split(".");
	
	$scope.obtenerNumeroDeHostQueDeberiaUsar = (numeroHosts, potencia) => Math.pow(2, potencia);
	$scope.calcularMascara = bitsPrestados =>{
		let posiciones = [128,64,32,16,8,4,2,1], mascara = 0;
		for(let x = 0; x < bitsPrestados; x++) mascara += posiciones[x];
		return mascara;
	};
	$scope.calcular = (hosts, ip) =>{
		if(hosts && ip){
			if(!REGEX_IP.test(ip)){
				alert("Parece que no pusiste una dirección ipv4 válida");
				return;
			}
			let arregloHosts = hosts.trim().split(","), octetos = $scope.parsearIp(ip);
			if(arregloHosts.length > 0){
				//Los convertimos a enteros para después ordenarlos
				arregloHosts = arregloHosts.map(host => parseInt(host));
				
				//Comprobar si todos los hosts pueden ocupar una subred
				arregloHosts.forEach(host => {
					if(host > CLASE_C.hostsPorSubred){
						alert(`¡No puedes tener una subred con más de ${CLASE_C.hostsPorSubred} hosts!`);
						$scope.quitarTabla();
						return;
					}
				});
				
				//Comprobar si la suma no es mayor a la cantidad máxima
				let suma = arregloHosts.reduce((a, b) => a + b, 0);
				if(suma >= CLASE_C.maximoNumeroHosts + 1){
					alert(`El número total de hosts (${suma}) supera al límite de hosts para la subred (${CLASE_C.maximoNumeroHosts + 1})`);
					$scope.quitarTabla();
					return;
				}
				
				//Los ordenamos de mayor a menor
				arregloHosts = arregloHosts.sort((a,b) => b - a);
				let contador = 0, ips = [];
				arregloHosts.forEach(host => {
					if(contador >= CLASE_C.maximoNumeroHosts) {
						alert(`¡No puedes tener más de ${CLASE_C.maximoNumeroHosts} hosts en la red!`);
						$scope.quitarTabla();
						return;
					}
					let potencia = $scope.obtenerPotenciaSuficiente(host),
						numeroHosts = $scope.obtenerNumeroDeHostQueDeberiaUsar(host, potencia),
						primerosTresOctetos = `${octetos[0]}.${octetos[1]}.${octetos[2]}`,
						bitsTomados = CLASE_C.bitsPorOcteto - potencia;
					ips.push({
						ip: `${primerosTresOctetos}.${contador}`,
						rango: `${contador + 1} - ${contador + numeroHosts - 2}`,
						broadcast: `${primerosTresOctetos}.${contador + numeroHosts - 1}`,
						mascaraDiagonal: `/${CLASE_C.bitsMascara + bitsTomados}`,
						mascara: `255.255.255.${$scope.calcularMascara(bitsTomados)}`
					});
					contador += numeroHosts;
				});
				$scope.ips = ips;
			}
		}
	};
}]);