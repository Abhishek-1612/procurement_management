'user strict';

exports.fulldate = function () {
    return Date();
};

exports.microsecond = function () {
    return Date.now();
};

exports.timestamp = function () {
    return Math.round(Date.now() / 1000)
};

exports.dbdate = function () {
    return dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
};

exports.curdate = function (date = "") {
    return dateFormat(new Date(), "yyyy-mm-dd");
    //return date.split(" ",1).toString();
};

exports.curtime = function () {
    return dateFormat(new Date(), "h:MM:ss");
    //return date.split(" ",1).toString();
};

exports.datetoddmmyyyy = function (date, sep) {
    if (sep == "-") {
        var date_format = "dd-mm-yyyy";
    } else {
        var date_format = "dd/mm/yyyy";
    }
    return dateFormat(new Date(date), date_format);
};


exports.datetoyyyymmdd = function (date, sep) {
    if (sep == "-") {
        var date_format = "yyyy-mm-dd";
    } else {
        var date_format = "yyyy/mm/dd";
    }
    return dateFormat(new Date(date), date_format);
};

exports.datetotimestamp = function (date) {
    return new Date(date).getTime() / 1000;
};


exports.timestamptodate = function (timestamp, time = false) {
    if (time == true) {
        var format = "yyyy-mm-dd h:MM:ss";
    } else {
        var format = "yyyy-mm-dd";
    }
    return dateFormat(new Date(timestamp * 1000), format);
};


exports.md5 = function (text) {
    var crypto = require('crypto');
    var enc_md5 = crypto.createHash('md5').update(text).digest("hex");
    return enc_md5;
}

exports.rand = function (min = "", max = "") {
    if (min != "" && max != "") {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
        //return Math.round(Math.random() * (max - min) + min);
    } else {
        return Math.round(Math.random());
}

}


exports.validate_field = function (field, value) {
    if (value == undefined)
        return {status: 0, message: field + ' field is required'};
    if (value == "")
        return {status: 0, message: field + ' cannot be empty'};
}


exports.parse_rawdata = function (data) {
    return data[Object.keys(data)[0]];
}


exports.explode = function (data) {
    return data.split(',');
}


exports.implode = function (data) {
    return data.toString();
}

exports.array_unique = function(array){
    return Array.from(new Set(array));
}



exports.json_decode = function (data) {
    var arr = JSON.parse(data);
    var arr_1 = Object.keys(arr);
    return arr_1;
}


exports.json_encode = function (data) {
    return JSON.stringify(data);
}


exports.obj_merge = function (obj1, obj2) {
    return JSON.parse((JSON.stringify(obj1) + JSON.stringify(obj2)).replace(/}{/g, ","));
}




exports.send_sms = function (data) {
    if (data) {
        var RequestClient = require("reqclient").RequestClient;
        //var urlencode = require('urlencode');

        var apikey = SMS_API_KEY;
        var route = SMS_ROUTE;
        var sender = SMS_SENDER;
        var message = data.message; //"Your otp is 3250";
        var mobile = data.mobile; //"+919015190272";
        // message  =  urlencode(message);
        var base_url = "http://www.smsalert.co.in/api/";
        var req_url = "push.json?apikey=" + apikey + "&route=" + route + "&sender=" + sender + "&mobileno=" + mobile + "&text=" + message;
        //pre(req_url); die();
        var client = new RequestClient({
            baseUrl: base_url,
            debugRequest: false,
            debugResponse: false
        });
        var resp = client.post(req_url, {}, {headers: {}})
        return true;
    } else {
        return false;
    }
}

exports.reverse_object = function reverse_object(object) {
    var newObject = {};
    var keys = [];

    for (var key in object) {
        keys.push(key);
    }

    for (var i = keys.length - 1; i >= 0; i--) {
        var value = object[keys[i]];
        newObject[keys[i]] = value;
    }

    return newObject;
}



exports.create_jwt = function create_jwt(data) {
    const claims = data;
    const token = jwt.create(claims, JWT_KEY);
    token.setExpiration(new Date().getTime() + ((30 * 86400) * 1000)) // 30 days
    var jwt_token = token.compact();

    return jwt_token;
}


exports.verify_jwt = function verify_jwt(jwt_token) {
    jwt.verify(jwt_token, JWT_KEY, (err, verifiedJwt) => {
        if (err) {
            return JSON.stringify({'status': false});
        } else {
            return JSON.stringify({'status': true, 'data': verifiedJwt});
        }
    });
}



exports.upload_file = function upload_file(field_name, file_saving_path = "") {
//    if (file_saving_path == "") {
//        file_saving_path = __dirname + '/uploads/';
//    }
//    var storage = multer.diskStorage({
//        destination: function (req, file, cb) {
//            cb(null, file_saving_path);
//        },
//        // By default, multer removes file extensions so let's add them back
//        filename: function (req, file, cb) { pre(file);
//            cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
//        }
//    });

    let uploads = upload.single(field_name);

//    upload(req, res, function (err) {
//        pre(req.file);
//        // req.file contains information of uploaded file
//        // req.body contains information of text fields, if there were any
//
//        if (req.fileValidationError) {
//            return res.send(req.fileValidationError);
//        } else if (!req.file) {
//            return res.send('Please select an image to upload');
//        } else if (err instanceof multer.MulterError) {
//            return res.send(err);
//        } else if (err) {
//            return res.send(err);
//        }
//
//        // Display uploaded image for user validation
//        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
//    });

   return true;
}



