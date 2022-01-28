import axios from 'axios';

const api = axios.create({
    baseURL: '192.168.0.102:3333',
});

//essa baseURL eu defini de acordo com o ip do meu pc na rede
//tenho que considerar esse endereço pois meu celular tem que conseguir acessar ele durante o desenvolvimento

//portanto, tenhoque startar o servidor (json-sever) setando o host com o ip da rede, executando o comando no terminal:
//json-server ./src/services/server.json --host 192.168.0.102 --port 3333

export default api;