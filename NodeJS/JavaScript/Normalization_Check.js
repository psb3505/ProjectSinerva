const database = require('../database.js');

async function ID_Normalization_Check(value){
    
    // 반드시 영문으로 시작 숫자+언더바/하이픈 허용 4~20자리
    let id_normal = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,29}$/;
    let bool;
    if(id_normal.test(value)){
        const query = 'SELECT COUNT(*) AS count FROM user WHERE id = ?';

        const result = await database.Query(query, value);
        if (result instanceof Error) {
            return;
        }
        bool = result[0].count === 0;
    };
    return bool;   
}
async function PW_Normalization_Check(pw){
    let pw_normal = /^.{4,50}$/;
    let bool = await pw_normal.test(pw);


    return bool;   
}
async function PW_Confirm_Check(pw, confirm_pw){
    let bool = await pw === confirm_pw;

    return bool;   
}
async function Nick_Name_Normalization_Check(value){
    let nick_name_normal = /^[A-Za-z0-9ㄱ-ㅎ가-힣]{1,19}$/;
    let bool;
    if(nick_name_normal.test(value)){
        const query = 'SELECT COUNT(*) AS count FROM user WHERE nick_name = ?';
        
        const result = await database.Query(query, value);
        
        if (result instanceof Error) {
            return;
        }
        bool = result[0].count === 0;
    };
    return bool;   
}
async function Phone_Num_Normalization_Check(value) {
    let bool;

    if (value) {
        const query = 'SELECT COUNT(*) AS count FROM user WHERE phone_num = ?';
        
        const result = await database.Query(query, value);

        if (result instanceof Error) {
            return;
        }
        bool = result[0].count === 0;

        if (value.startsWith("02")) {
            if (value.length == 12) {
                return bool;
            }
        }
        else {
            if (value.length == 13) {
                return bool;
            }
        }
    }
    else {
        if (value.startsWith("02")) {
            if (value.length == 12) {
                return bool;
            }
        }
        else {
            if (value.length == 13) {
                return bool;
            }
        }
    }
    
}
async function Email_Normalization_Check(value) {
    let email_normal = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]){4,}@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]){4,}\.[a-zA-Z]{2,3}$/i;
    let bool;
    
    if(email_normal.test(value)){
        const query = 'SELECT COUNT(*) AS count FROM user WHERE email = ?';
        
        const result = await database.Query(query, value);
        
        if (result instanceof Error) {
            return;
        }
        bool = result[0].count === 0;
    };
    return bool;
}
async function Address_Normalization_Check(value) {
    return value;
}
module.exports = {
    ID_Check: ID_Normalization_Check,
    PW_Check: PW_Normalization_Check,
    Confirm_Pw_Check: PW_Confirm_Check,
    Nick_Name_Check: Nick_Name_Normalization_Check,
    Phone_Num_Check: Phone_Num_Normalization_Check,
    Email_Check: Email_Normalization_Check,
    Address_Check: Address_Normalization_Check
};