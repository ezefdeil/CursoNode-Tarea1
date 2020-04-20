module.exports = function(dataFile){     
    const fs = require('fs');     

    fs.readFile(dataFile, (err, data) => {                        
        if (err) throw err;
        var dataArchivo = data.toString();

        var lineas = dataArchivo.split('\r\n').splice(1);

        var transacciones = lineas.map(l => {
            var lineSplit =  l.split(':');
            var date = lineSplit[1];
            var time = lineSplit[2]
            ret = {
                TransactionId:lineSplit[0],
                Date: new Date(date.substr(0,4),date.substr(4,2),date.substr(6,2),time.substr(0,2),time.substr(2,2)).toLocaleString("es-AR",{dateStyle: "full",timeStyle:"full"}),               
                Status:lineSplit[3]
            }
            return ret;
        });
        console.log('All Transactions\r\n===========================');
        console.table(transacciones);      

        console.log('Transactions not successful\r\n===========================');
        console.table(transacciones.filter(t=>t.Status!='OK'));
      });    

    return;
}