
from flask import Flask,request
import sqlite3
import time
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
def create_table(cur,table_name):
    sql = 'create table if not exists ' + table_name+ ' (ID INTEGER PRIMARY KEY AUTOINCREMENT,Temprature,PH,Water_Level,Time_recorded)'
    cur.execute(sql)
def insert_data(temp,ph,water_level,table_name,cur):
    seconds = time.time()
    localtime = time.ctime(seconds)
    cur.execute("INSERT INTO "+ table_name + "(Temprature,PH,Water_Level,Time_recorded)values(?,?,?,?)",(temp,ph,water_level,localtime))
def select_latest_data(cur,table_name):
    cur.execute("select * from "+table_name + " where ID=(select MAX(ID) from " + table_name+")")
    rows = cur.fetchall();
    return rows

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

    rows1 = select_latest_data(cur,"Pond_1")
    rows2 = select_latest_data(cur,"Pond_2")
    rows3 = select_latest_data(cur,"Pond_3")
    rows4 = select_latest_data(cur,"Pond_4")
    
    # insert_data('14','7','1',"Pond_1",cur)
    # insert_data('65','8','13',"Pond_2",cur)
    # insert_data('10','8','1.5',"Pond_3",cur)
    # insert_data('12','5','0.5',"Pond_4",cur)
    # conn.commit()

    top_rows = {
    "datas":[
    {"ID":rows1[0]["ID"],"pond_number":"1","Temp":rows1[0]["Temprature"],"PH":rows1[0]["PH"],"Water_Level":rows1[0]["Water_Level"],"Time_recorded":rows1[0]["Time_recorded"]},
    {"ID":rows2[0]["ID"],"pond_number":"2","Temp":rows2[0]["Temprature"],"PH":rows2[0]["PH"],"Water_Level":rows2[0]["Water_Level"],"Time_recorded":rows2[0]["Time_recorded"]},
    {"ID":rows3[0]["ID"],"pond_number":"3","Temp":rows3[0]["Temprature"],"PH":rows3[0]["PH"],"Water_Level":rows3[0]["Water_Level"],"Time_recorded":rows3[0]["Time_recorded"]},
    {"ID":rows4[0]["ID"],"pond_number":"4","Temp":rows4[0]["Temprature"],"PH":rows4[0]["PH"],"Water_Level":rows4[0]["Water_Level"],"Time_recorded":rows4[0]["Time_recorded"]}
    ]
    }
    return top_rows

# @app.route('/details-Pond<pondnum>/history')
# def pond():
#     conn = sqlite3.connect('fishfarm.db')
#     conn.row_factory = sqlite3.Row
#     cur = conn.cursor()
#     rows = select_data(cur,'Pond_'+request.args.get('x'))
#     top_rows = {
#     "datas":[
#     {"ID":rows[0]["ID"],"pond_number":"1","Temp":rows[0]["Temprature"],"PH":rows[0]["PH"],"Water_Level":rows[0]["Water_Level"],"Time_recorded":rows[0]["Time_recorded"]},
#     {"ID":rows[1]["ID"],"pond_number":"2","Temp":rows[1]["Temprature"],"PH":rows[1]["PH"],"Water_Level":rows[1]["Water_Level"],"Time_recorded":rows[1]["Time_recorded"]},
#     {"ID":rows[2]["ID"],"pond_number":"3","Temp":rows[2]["Temprature"],"PH":rows[2]["PH"],"Water_Level":rows[2]["Water_Level"],"Time_recorded":rows[2]["Time_recorded"]},
#     {"ID":rows[3]["ID"],"pond_number":"4","Temp":rows[3]["Temprature"],"PH":rows[3]["PH"],"Water_Level":rows[3]["Water_Level"],"Time_recorded":rows[3]["Time_recorded"]}
#     ]
#     }
#     return top_rows

if __name__ == '__main__':
    app.run(host='0.0.0.0')