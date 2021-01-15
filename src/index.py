from flask import Flask,request
from flask_cors import CORS
import sqlite3
app = Flask(__name__)
CORS(app)
def create_table(cur,table_name):
    sql = 'create table if not exists ' + table_name+ ' (ID INTEGER AUTOINCREAMENT,Temprature,PH,Water_Level,Time_recorded)'
    cur.execute(sql)
def insert_data(temp,ph,water_level,table_name,cur):
    cur.execute("INSERT INTO "+ table_name + "(Temprature,PH,Water_Level)values(?,?,?)",(temp,ph,water_level))
def select_data(cur,table_name):
    cur.execute("select * from "+table_name)
    rows = cur.fetchall();
    return rows
    
@app.route('/')
def manage_data():
    conn = sqlite3.connect('fishfarm.db')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    create_table(cur,'Pond_1')
    create_table(cur,'Pond_2')
    create_table(cur,'Pond_3')
    create_table(cur,'Pond_4')

    rows1 = select_data(cur,"Pond_1")
    rows2 = select_data(cur,"Pond_2")
    rows3 = select_data(cur,"Pond_3")
    rows4 = select_data(cur,"Pond_4")
    # insert_data('15','4','2',"Pond_1",cur)
    # insert_data('16','5','3',"Pond_2",cur)
    # insert_data('17','6','4',"Pond_3",cur)
    # insert_data('18','7','1',"Pond_4",cur)
    # conn.commit()
 
    top_rows = {
    "datas":[
    {"ID":rows1[0]["ID"],"pond_number":"1","Temp":rows1[0]["Temprature"],"PH":rows1[0]["PH"],"Water_Level":rows1[0]["Water_Level"]},
    {"ID":rows2[0]["ID"],"pond_number":"2","Temp":rows2[0]["Temprature"],"PH":rows2[0]["PH"],"Water_Level":rows2[0]["Water_Level"]},
    {"ID":rows3[0]["ID"],"pond_number":"3","Temp":rows3[0]["Temprature"],"PH":rows3[0]["PH"],"Water_Level":rows3[0]["Water_Level"]},
    {"ID":rows4[0]["ID"],"pond_number":"4","Temp":rows4[0]["Temprature"],"PH":rows4[0]["PH"],"Water_Level":rows4[0]["Water_Level"]}
    ]
    }
    return top_rows



if __name__ == '__main__':
    app.run(host='0.0.0.0')