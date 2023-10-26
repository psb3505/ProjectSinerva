const database = require('../database.js');

async function FindId(nick_name, userType, phone_num, email){
    
    let query = '';
    let values = [];
    

    if (phone_num && email) {
        query = 'SELECT id, nick_name FROM user WHERE nick_name = ? AND userType = ? AND phone_num = ? AND email = ?';
        values = [nick_name, userType, phone_num, email];
    }
    else if (phone_num) {
        query = 'SELECT id, nick_name FROM user WHERE nick_name = ? AND userType = ? AND phone_num = ?';
        values = [nick_name, userType, phone_num];
    }
    else if (email) {
        query = 'SELECT id, nick_name FROM user WHERE nick_name = ? AND userType = ? AND email = ?';
        values = [nick_name, userType, email];
    }
    else {
        query = 'SELECT id, nick_name FROM user WHERE nick_name = ? AND userType = ?';
        values = [nick_name, userType];
    }

    const result = await database.Query(query, values);

    if (result instanceof Error) {
        return;
    }

    if (result.length > 0) {
        const user = [result[0].id, result[0].nick_name];
        console.log(user);
        return user;
    } else {
        const user = [null, null];
        console.log('해당유저없음');
        return user;
    }
    
}

async function FindPw(id, userType, phone_num, email){
    
    let query = '';
    let values = [];

    if (phone_num && email) {
        query = 'SELECT pw, nick_name FROM user WHERE id = ? AND userType = ? AND phone_num = ? AND email = ?';
        values = [id, userType, phone_num, email];
    }
    else if (phone_num) {
        query = 'SELECT pw, nick_name FROM user WHERE id = ? AND userType = ? AND phone_num = ?';
        values = [id, userType, phone_num];
    }
    else if (email) {
        query = 'SELECT pw, nick_name FROM user WHERE id = ? AND userType = ? AND email = ?';
        values = [id, userType, email];
    }
    else {
        query = 'SELECT pw, nick_name FROM user WHERE id = ? AND userType = ?';
        values = [id, userType];
    }

    const result = await database.Query(query, values);

    if (result instanceof Error) {
        return;
    }

    if (result.length > 0) {
        const user = [result[0].pw, result[0].nick_name];
        console.log(user);
        return user;
    } else {
        const user = [null, null];
        console.log('해당유저없음');
        return user;
    }
}

module.exports = {
    FindId: FindId,
    FindPw: FindPw
};