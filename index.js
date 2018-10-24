var http = require('http');
var fs = require('fs');
const express = require('express');
var request = require('request');
const app = express();

app.get('/hello', (req, res) => {
    fs.readFile("views/index.html", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(pgResp);
        }
       // resp.write(data);
       res.end();
    }); 
});
app.get('/getDataCases', (req, res) => { 
    var url = "http://localhost/Ringtail.WebServices.Portal/api/query?q=";
    var apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkluTlpoVy1OMDg2LTNCeXRncnFxTlRENEg0QSJ9.eyJpc3MiOiJodHRwOi8vYXBwLnJpbmd0YWlsLmNvbSIsImF1ZCI6Imh0dHA6Ly9hcHAucmluZ3RhaWwuY29tIiwibmJmIjoxNTE5MTUwNDEwLCJleHAiOjE2MTM4NDQ4MTAsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJ3Y3R4IjoidTMyVC81ZWxUVmRnMzJyQ0t6bTRlNVJnVE1vdktNTXNVZG5hVGxuODhQT1NqdTE3U2ZjL2pMSmFhTTVwblJFNHh1SEp3a0x1RXVnaXBZa25qcDN3R2c9PSIsInd0cmVhbG0iOiJodHRwOi8vYXBwLnJpbmd0YWlsLmNvbSIsImp0aSI6IjZUSHdKcmpZamVyZnl1cXNtcUw3Ulo0dmppdXFnNHZMTml3YWNYVjdVMHZSQTUxZVNuQlduS01Ca2FHZlg1MjRudHZqdUkrN2ZBVHI0UjhURjJvTDZBPT0iLCJzdWIiOiJhZG1pbiJ9.GLMz9hM_j_87GyyCm0ulCV6AGZi_0lZbhTNmn-zE0hxScI2-DsnZJUvqhbcpe2Y-HfwuBrGC21aXoOkc4-YKV7LZu1QnR0vRq516I1jBmKjHndZQP0f4J2nFmaBXs4jJbLVKiRtHdCL8AirI29l59S1VbkinSNvNnXDKmwLcEy3n0KeXtdUzWk2XOb9yTEUQ8-jkFee2xDNABwWDgyxcksDQW69tPApf-bB6FpeiBgbKvXzi_gbIIrNnDFFhYnyrQv4M0Ktt3ehEP7vXpPoXkyE0tCEOJdQDDnLppd9kWxG6NrjEAAy1TEjV8wS7nzJWqAxckdxGGE0zaCIuByuZnQ';
    var apiKey =  'ebd8bc47-91e8-4e9a-9b15-022d788e9f2a';
    var query = "query { cases { name statistics {countOfIngestionDocs countOfIngestionJobs sizeOfBaseDocumentsHostedDetails sizeOfFolderData_Ingest_Temp sizeOfFolderData_Upload sizeOfNonDocumentData    } } }";

    var data = "";
    var headers = {
        'bearer': apiToken,
        'Authorization':'bearer '+apiToken,
        'ApiKey':apiKey
    }
    
    // Configure the request
    var options = {
        url: url+query,
        method: 'GET',
        headers: headers
    }

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = body;
            res.send(body);
        }
        else{
            console.log(error)
        }
    })

 
});
app.get('/getData', (req, res) => { 
    var url = "http://localhost/Ringtail.WebServices.Portal/api/query?q=";
    var apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkluTlpoVy1OMDg2LTNCeXRncnFxTlRENEg0QSJ9.eyJpc3MiOiJodHRwOi8vYXBwLnJpbmd0YWlsLmNvbSIsImF1ZCI6Imh0dHA6Ly9hcHAucmluZ3RhaWwuY29tIiwibmJmIjoxNTE5MTUwNDEwLCJleHAiOjE2MTM4NDQ4MTAsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJ3Y3R4IjoidTMyVC81ZWxUVmRnMzJyQ0t6bTRlNVJnVE1vdktNTXNVZG5hVGxuODhQT1NqdTE3U2ZjL2pMSmFhTTVwblJFNHh1SEp3a0x1RXVnaXBZa25qcDN3R2c9PSIsInd0cmVhbG0iOiJodHRwOi8vYXBwLnJpbmd0YWlsLmNvbSIsImp0aSI6IjZUSHdKcmpZamVyZnl1cXNtcUw3Ulo0dmppdXFnNHZMTml3YWNYVjdVMHZSQTUxZVNuQlduS01Ca2FHZlg1MjRudHZqdUkrN2ZBVHI0UjhURjJvTDZBPT0iLCJzdWIiOiJhZG1pbiJ9.GLMz9hM_j_87GyyCm0ulCV6AGZi_0lZbhTNmn-zE0hxScI2-DsnZJUvqhbcpe2Y-HfwuBrGC21aXoOkc4-YKV7LZu1QnR0vRq516I1jBmKjHndZQP0f4J2nFmaBXs4jJbLVKiRtHdCL8AirI29l59S1VbkinSNvNnXDKmwLcEy3n0KeXtdUzWk2XOb9yTEUQ8-jkFee2xDNABwWDgyxcksDQW69tPApf-bB6FpeiBgbKvXzi_gbIIrNnDFFhYnyrQv4M0Ktt3ehEP7vXpPoXkyE0tCEOJdQDDnLppd9kWxG6NrjEAAy1TEjV8wS7nzJWqAxckdxGGE0zaCIuByuZnQ';
    var apiKey =  'ebd8bc47-91e8-4e9a-9b15-022d788e9f2a';
    var query = "query { users(disabled:false, licenses: {comparison: GreaterThanOrEqualTo, value: 1}) {  fullName  lastLogin activeCase  userName  email  companyName licenses disabled organizations { name }  }  }" ;

    var data = "";
    var headers = {
        'bearer': apiToken,
        'Authorization':'bearer '+apiToken,
        'ApiKey':apiKey
    }
    
    // Configure the request
    var options = {
        url: url+query,
        method: 'GET',
        headers: headers
    }

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = body;
            res.send(body);
        }
        else{
            console.log(error)
        }
    })

 
});
app.listen(8080);
console.log('Server Started listening on 8080');