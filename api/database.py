import pg8000
from config import DB_CONFIG

def get_connection():
    try:
        return pg8000.connect(
            host=DB_CONFIG["host"],
            port=DB_CONFIG["port"],
            database=DB_CONFIG["database"],
            user=DB_CONFIG["user"],
            password=DB_CONFIG["password"]
        )
    except Exception as e:
        print(f"Error al conectar a la base de datos: {e}")
        raise

def execute_procedure(procedure_name, params=None):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        if params:
            cursor.execute(f"CALL {procedure_name}({', '.join(['%s'] * len(params))})", params)
            print(f"CALL {procedure_name}({', '.join(['%s'] * len(params))})", params)
            result = cursor.fetchall() if cursor.description else None
        else:
            cursor.execute(f"CALL {procedure_name}()") #Pendiente el funcionamiento completo de procedimientos sin parametros 
            result = cursor.fetchall()
            if cursor.description:
                for row in cursor:
                    print(row)
            else: None
    
        print(result)
        conn.commit()
        return result
    except Exception as e:
        print(f"Error executing query: {e}")
        raise
    finally:
        cursor.close()
        conn.close()
        
def execute_query(query, params=None):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(query, params or ())
        result = cursor.fetchall() if cursor.description else None
        conn.commit()
        return result
    except Exception as e:
        print(f"Error executing query: {e}")
        raise
    finally:
        cursor.close()
        conn.close()
