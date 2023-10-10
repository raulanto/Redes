# Ejercicio
Debido a la crisis económica, la empresa “ROUTERLANDIA” solo ha podido adquirir una dirección IP pública, para el funcionamiento de sus oficinas, por lo tanto necesita administrar de forma óptima la asignación de direcciones para cada una.


A continuación se detallan los datos necesarios para cada una, a partir de la dirección 195.20.20.0/24.

| Subred   | Número de hosts |
|----------|-----------------|
| 1 (primera) | 28            |
| 2 (segunda) | 12            |
| 3 (tercera) | 5             |
| 4 (cuarta)  | 2             |
| 5 (quinta)  | 2             |
| 6 (sexta)   | 2             |
| 7 (séptima) | 2             |
| 8 (octava)  | 2             |


<center>
<image src="./Topología-y-distribución-Ejercicio-1.png" alt="Descripción de la imagen">
</center>

La asignación de direcciones ip para cada dispositivo se muestra a continuación:

|Dispositivo|Interfaz|Subred|Dirección IP|Hosts|Gateway o puerta de enlace|Conexión WAN
|-|-|-|-|-|-|-
Router 0|Fastethernet 0/0|Primera|Primera utilizable|28|No aplica|No aplica
||Serial 0/0|Quinta|Segunda utilizable||No aplica|DTE
Router 1|Serial 0/0|Sexta|Primera utilizable|2|No aplica|DCE (56000)
||Serial 0/1|Octava|Primera utilizable|2|No aplica|DCE (56000)
||Serial 0/2|Séptima|Primera utilizable|2|No aplica|DCE (56000)
||Serial 0/3|Quinta|Primera utilizable|2|No aplica|DCE (56000)
Router 2|Fastethernet 0/0|Cuarta|Primera utilizable|2|No aplica|No aplica
||Serial 0/0|Séptima|Segunda utilizable||No aplica|DTE
Router 3|Fastethernet 0/0|Tercera|Primera utilizable|5|No aplica|No aplica
||Serial 0/0|Sexta|Segunda utilizable||No aplica|DTE
Router 4|Fastethernet 0/0|Segunda|Primera utilizable|12|No aplica|No aplica
||Serial 0/0|Octava|Segunda utilizable||No aplica|DTE
PC 0|Fastethernet 0/0|Primera|Segunda utilizable||De acuerdo al cálculo|No aplica
PC 1|Fastethernet 0/0|Segunda|Segunda utilizable||De acuerdo al cálculo|No aplica
PC 2|Fastethernet 0/0|Tercera|Segunda utilizable||De acuerdo al cálculo|No aplica
Servidor|Fastethernet 0/0|Cuarta|Segunda utilizable||De acuerdo al cálculo|No aplica

